import express from 'express';
import reviewsController from '../controllers/reviewController.js';
import {
  authenticateToken,
  optionalAuth,
  checkReviewOwnership,
  reviewRateLimit
} from '../middlewares/validateAuthToken.js'; 
const router = express.Router();

router.get('/product/:productId', optionalAuth, reviewsController.getReviewsByProduct);
router.get('/:id', reviewsController.getReviewById);
router.post('/', authenticateToken, reviewRateLimit, reviewsController.createReview);
router.put('/:id', authenticateToken, checkReviewOwnership, reviewsController.updateReview);
router.delete('/:id', authenticateToken, checkReviewOwnership, reviewsController.deleteReview);
router.patch('/:id/helpful', reviewsController.markReviewHelpful);
router.post('/:id/report', reviewsController.reportReview);
router.post('/seed', reviewsController.seedReviews); // solo para test

export default router;
