import express from 'express';
import loginController from '../controllers/loginController.js';
 
const router = express.Router();
 
router.get('/', loginController.getLogin);
router.post('/', loginController.insertLogin);
router.delete('/:id', loginController.deleteLogin);
router.put('/:id', loginController.updateLogin);
 
export default router