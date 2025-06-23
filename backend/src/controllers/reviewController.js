import Review from '../models/Review.js';

const reviewsController = {
  // Crear nueva review
  async createReview(req, res) {
    try {
      const { rating, comment, productId } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
      }

      if (!rating || !comment || !productId) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
      }

      if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
        return res.status(400).json({ success: false, message: 'La calificación debe ser un número entre 1 y 5' });
      }

      const newReview = new Review({
        userId,
        productId,
        rating,
        comment: comment.trim()
      });

      const saved = await newReview.save();

      res.status(201).json({ success: true, data: saved });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al crear la review', error: err.message });
    }
  },

  // Obtener reviews por producto
  async getReviewsByProduct(req, res) {
    try {
      const { productId } = req.params;
      const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

      res.json({ success: true, data: reviews });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al obtener reviews', error: err.message });
    }
  },

  // Obtener review por ID
  async getReviewById(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findById(id);
      
      if (!review) {
        return res.status(404).json({ success: false, message: 'Review no encontrada' });
      }
      
      res.json({ success: true, data: review });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al obtener review', error: err.message });
    }
  },

  // Actualizar review
  async updateReview(req, res) {
    try {
      const { id } = req.params;
      const { rating, comment } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
      }

      const review = await Review.findById(id);
      
      if (!review) {
        return res.status(404).json({ success: false, message: 'Review no encontrada' });
      }

      // Verificar que el usuario sea el propietario de la review
      if (review.userId.toString() !== userId.toString()) {
        return res.status(403).json({ success: false, message: 'No tienes permisos para actualizar esta review' });
      }

      if (rating && (rating < 1 || rating > 5 || !Number.isInteger(rating))) {
        return res.status(400).json({ success: false, message: 'La calificación debe ser un número entre 1 y 5' });
      }
      
      if (rating) review.rating = rating;
      if (comment) review.comment = comment.trim();
      
      await review.save();
      res.json({ success: true, data: review });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al actualizar review', error: err.message });
    }
  },

  // Eliminar review
  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
      }

      const review = await Review.findById(id);
      
      if (!review) {
        return res.status(404).json({ success: false, message: 'Review no encontrada' });
      }

      // Verificar que el usuario sea el propietario de la review
      if (review.userId.toString() !== userId.toString()) {
        return res.status(403).json({ success: false, message: 'No tienes permisos para eliminar esta review' });
      }

      await Review.findByIdAndDelete(id);
      res.json({ success: true, message: 'Review eliminada correctamente' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al eliminar review', error: err.message });
    }
  },

  // Marcar review como útil
  async markReviewHelpful(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
      }

      const review = await Review.findById(id);
      
      if (!review) {
        return res.status(404).json({ success: false, message: 'Review no encontrada' });
      }

      // Verificar si el usuario ya marcó esta review como útil
      const alreadyHelpful = review.helpfulBy && review.helpfulBy.includes(userId);
      
      if (alreadyHelpful) {
        return res.status(400).json({ success: false, message: 'Ya has marcado esta review como útil' });
      }

      // Agregar funcionalidad de helpful si tu modelo lo soporta
      // Por ahora solo retornamos éxito
      res.json({ success: true, message: 'Review marcada como útil' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al marcar review', error: err.message });
    }
  },

  // Reportar review
  async reportReview(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
      }

      if (!reason || reason.trim().length === 0) {
        return res.status(400).json({ success: false, message: 'La razón del reporte es requerida' });
      }

      const review = await Review.findById(id);
      
      if (!review) {
        return res.status(404).json({ success: false, message: 'Review no encontrada' });
      }

      // Aquí podrías agregar lógica para guardar el reporte en una colección separada
      // Por ahora solo retornamos éxito
      console.log(`Review ${id} reportada por usuario ${userId}. Razón: ${reason}`);
      
      res.json({ success: true, message: 'Review reportada correctamente' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al reportar review', error: err.message });
    }
  },

  // Seed reviews (para testing)
  async seedReviews(req, res) {
    try {
      // Solo permitir en desarrollo
      if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ success: false, message: 'No disponible en producción' });
      }

      const sampleReviews = [
        {
          userId: '507f1f77bcf86cd799439011', // ID de ejemplo
          productId: '507f1f77bcf86cd799439012', // ID de ejemplo
          rating: 5,
          comment: 'Excelente producto, muy recomendado'
        },
        {
          userId: '507f1f77bcf86cd799439013', // ID de ejemplo
          productId: '507f1f77bcf86cd799439012', // ID de ejemplo
          rating: 4,
          comment: 'Buen producto, cumple las expectativas'
        },
        {
          userId: '507f1f77bcf86cd799439014', // ID de ejemplo
          productId: '507f1f77bcf86cd799439015', // ID de ejemplo
          rating: 3,
          comment: 'Producto promedio, podría mejorar'
        }
      ];

      const createdReviews = await Review.insertMany(sampleReviews);
      
      res.json({ 
        success: true, 
        message: `${createdReviews.length} reviews de prueba creadas correctamente`,
        data: createdReviews
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al crear reviews de prueba', error: err.message });
    }
  }
};

export default reviewsController;