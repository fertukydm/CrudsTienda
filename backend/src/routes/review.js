

import express from 'express';
import reviewsController from '../controllers/reviewController.js';

const router = express.Router();


const logRequest = (req, res, next) => {
  console.log(`🌐 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
};


router.use(logRequest);



router.get('/reviews', reviewsController.getAllReviews);


router.get('/reviews/stats/:productId', reviewsController.getProductStats);


router.get('/reviews/:productId', reviewsController.getReviewsByProduct);

router.post('/reviews', reviewsController.createReview);


router.put('/reviews/:reviewId', reviewsController.updateReview);

router.delete('/reviews/:reviewId', reviewsController.deleteReview);


router.get('/reviews/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servicio de reviews funcionando correctamente',
    timestamp: new Date().toISOString(),
    endpoints: {
      'GET /api/reviews': 'Obtener todas las reviews',
      'GET /api/reviews/:productId': 'Obtener reviews de un producto',
      'POST /api/reviews': 'Crear nueva review',
      'PUT /api/reviews/:reviewId': 'Actualizar review',
      'DELETE /api/reviews/:reviewId': 'Eliminar review',
      'GET /api/reviews/stats/:productId': 'Obtener estadísticas del producto'
    }
  });
});

export default router;