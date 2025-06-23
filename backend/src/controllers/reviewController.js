
let reviews = [];
let contadorIdReviews = 1;

// Función auxiliar para validaciones
const validateReviewData = ({ productId, rating, comment }) => {
  if (!productId) {
    return 'El ID del producto es requerido';
  }
  
  if (!rating || rating < 1 || rating > 5) {
    return 'La calificación debe estar entre 1 y 5';
  }
  
  if (!comment || comment.trim().length < 5) {
    return 'El comentario debe tener al menos 5 caracteres';
  }
  
  if (comment.trim().length > 500) {
    return 'El comentario no puede exceder 500 caracteres';
  }
  
  return null; // Sin errores
};

const reviewsController = {
  
  // GET /api/reviews - Obtener todas las reviews
  getAllReviews: async (req, res) => {
    try {
      console.log('📋 Controller: Obteniendo todas las reviews');
      
      res.status(200).json({
        success: true,
        reviews: reviews,
        total: reviews.length,
        message: `Se encontraron ${reviews.length} reseñas`
      });
      
    } catch (error) {
      console.error('❌ Error en getAllReviews:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // GET /api/reviews/:productId - Obtener reviews de un producto
  getReviewsByProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      console.log(`📋 Controller: Obteniendo reviews del producto ${productId}`);
      
      const reviewsDelProducto = reviews.filter(review => review.productId === productId);
      
      res.status(200).json({
        success: true,
        reviews: reviewsDelProducto,
        total: reviewsDelProducto.length,
        productId: productId
      });
      
    } catch (error) {
      console.error('❌ Error en getReviewsByProduct:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las reseñas del producto',
        error: error.message
      });
    }
  },

  // POST /api/reviews - Crear nueva review
  createReview: async (req, res) => {
    try {
      console.log('📝 Controller: Creando nueva review');
      console.log('📦 Datos recibidos:', req.body);
      
      const { productId, rating, comment, userId = 'anonimo' } = req.body;
      
      // Validaciones
      const validationError = validateReviewData({ productId, rating, comment });
      if (validationError) {
        return res.status(400).json({
          success: false,
          message: validationError
        });
      }
      
      // Crear nueva review
      const nuevaReview = {
        id: contadorIdReviews++,
        productId: productId.toString(),
        userId: userId.toString(),
        rating: parseInt(rating),
        comment: comment.trim(),
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      };
      
      // Agregar a la "base de datos"
      reviews.push(nuevaReview);
      
      console.log('✅ Review creada exitosamente:', nuevaReview);
      
      res.status(201).json({
        success: true,
        message: '¡Reseña enviada exitosamente!',
        review: nuevaReview
      });
      
    } catch (error) {
      console.error('❌ Error en createReview:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al crear la reseña',
        error: error.message
      });
    }
  },

  // DELETE /api/reviews/:reviewId - Eliminar review
  deleteReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      console.log(`🗑️ Controller: Eliminando review ${reviewId}`);
      
      const reviewIndex = reviews.findIndex(review => review.id === parseInt(reviewId));
      
      if (reviewIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Reseña no encontrada'
        });
      }
      
      const reviewEliminada = reviews.splice(reviewIndex, 1)[0];
      
      console.log('✅ Review eliminada:', reviewEliminada.id);
      
      res.status(200).json({
        success: true,
        message: 'Reseña eliminada exitosamente',
        reviewEliminada: reviewEliminada
      });
      
    } catch (error) {
      console.error('❌ Error en deleteReview:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la reseña',
        error: error.message
      });
    }
  },

  // GET /api/reviews/stats/:productId - Obtener estadísticas
  getProductStats: async (req, res) => {
    try {
      const { productId } = req.params;
      console.log(`📊 Controller: Obteniendo estadísticas del producto ${productId}`);
      
      const reviewsDelProducto = reviews.filter(review => review.productId === productId);
      
      if (reviewsDelProducto.length === 0) {
        return res.status(200).json({
          success: true,
          stats: {
            totalReviews: 0,
            promedioCalificacion: 0,
            distribucionCalificaciones: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
          }
        });
      }
      
      const totalCalificaciones = reviewsDelProducto.reduce((sum, review) => sum + review.rating, 0);
      const promedio = (totalCalificaciones / reviewsDelProducto.length).toFixed(1);
      
      const distribucion = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      reviewsDelProducto.forEach(review => {
        distribucion[review.rating]++;
      });
      
      res.status(200).json({
        success: true,
        stats: {
          totalReviews: reviewsDelProducto.length,
          promedioCalificacion: parseFloat(promedio),
          distribucionCalificaciones: distribucion
        }
      });
      
    } catch (error) {
      console.error('❌ Error en getProductStats:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas de reseñas',
        error: error.message
      });
    }
  },

  // PUT /api/reviews/:reviewId - Actualizar review
  updateReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { rating, comment } = req.body;
      
      console.log(`✏️ Controller: Actualizando review ${reviewId}`);
      
      const reviewIndex = reviews.findIndex(review => review.id === parseInt(reviewId));
      
      if (reviewIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Reseña no encontrada'
        });
      }
      
      // Validar datos
      if (rating && (rating < 1 || rating > 5)) {
        return res.status(400).json({
          success: false,
          message: 'La calificación debe estar entre 1 y 5'
        });
      }
      
      if (comment && comment.trim().length < 5) {
        return res.status(400).json({
          success: false,
          message: 'El comentario debe tener al menos 5 caracteres'
        });
      }
      
      // Actualizar review
      if (rating) reviews[reviewIndex].rating = parseInt(rating);
      if (comment) reviews[reviewIndex].comment = comment.trim();
      reviews[reviewIndex].fechaActualizacion = new Date().toISOString();
      
      console.log('✅ Review actualizada:', reviews[reviewIndex]);
      
      res.status(200).json({
        success: true,
        message: 'Reseña actualizada exitosamente',
        review: reviews[reviewIndex]
      });
      
    } catch (error) {
      console.error('❌ Error en updateReview:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la reseña',
        error: error.message
      });
    }
  }
};

export default reviewsController;