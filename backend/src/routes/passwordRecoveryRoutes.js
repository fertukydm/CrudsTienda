// src/routes/passwordRecoveryRoutes.js
import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Ruta para enviar correo de recuperación
router.post('/sendRecoveryEmail', authController.sendRecoveryEmail);

// Ruta para verificar el código de recuperación
router.post('/verifyRecoveryCode', authController.verifyRecoveryCode);

// Ruta para resetear la contraseña
router.post('/resetPassword', authController.resetPassword);

export default router;
