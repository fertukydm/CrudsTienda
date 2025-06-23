import express from 'express';
// ✅ SOLUCIÓN: Importar funciones nombradas en lugar de default
import { 
  registerClient, 
  verifyEmail, 
  resendVerificationEmail 
} from '../controllers/registerClientsController.js';

const router = express.Router();


router.post('/register', registerClient);


router.get('/verify-email/:token', verifyEmail);


router.post('/resend-verification', resendVerificationEmail);

router.get('/test', (req, res) => {
  res.json({ 
    message: 'Rutas de registro funcionando correctamente',
    endpoints: {
      register: 'POST /register',
      verify: 'GET /verify-email/:token',
      resend: 'POST /resend-verification'
    }
  });
});

export default router;