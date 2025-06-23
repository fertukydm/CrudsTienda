// src/routes/auth.js

import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

const logRequest = (req, res, next) => {
  console.log(` AUTH ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
};

router.use(logRequest);
// POST /api/login - Iniciar sesión
router.post('/login', authController.login);

// POST /api/registerClients - Registrar cliente
router.post('/registerClients', authController.registerClient);

// POST /api/registerEmployee - Registrar empleado
router.post('/registerEmployee', authController.registerEmployee);

// POST /api/logout - Cerrar sesión
router.post('/logout', authController.logout);

// GET /api/users - Obtener todos los usuarios (admin)
router.get('/users', authController.getAllUsers);

// GET /api/debug/users - Debug endpoint (temporal)
router.get('/debug/users', authController.debugUsers);

// Ruta de salud para autenticación
router.get('/auth/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servicio de autenticación funcionando correctamente',
    timestamp: new Date().toISOString(),
    endpoints: {
      'POST /api/login': 'Iniciar sesión',
      'POST /api/registerClients': 'Registrar cliente',
      'POST /api/registerEmployee': 'Registrar empleado',
      'POST /api/logout': 'Cerrar sesión',
      'GET /api/users': 'Obtener usuarios (admin)'
    }
  });
});

export default router;