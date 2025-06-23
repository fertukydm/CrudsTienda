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
  }
};

export default reviewsController;
