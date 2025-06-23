import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Customer from '../models/customer.js'; 

// Configuración del transportador de correo
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const registerClient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar datos de entrada
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Todos los campos son requeridos'
      });
    }

    // Verificar si el cliente ya existe
    const existingClient = await Customer.findOne({ email });
    if (existingClient) {
      return res.status(400).json({
        message: 'El cliente ya existe con este email'
      });
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear nuevo cliente
    const newClient = new Client({
      name,
      email,
      password: hashedPassword,
      isVerified: false // Por defecto no verificado
    });

    // Guardar cliente en la base de datos
    const savedClient = await newClient.save();

    // Generar token de verificación
    const verificationToken = jwt.sign(
      { clientId: savedClient._id, email: savedClient.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Configurar email de verificación
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:4001'}/verify-email/${verificationToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '¡Bienvenido a OK Records! Verifica tu cuenta',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">¡Bienvenido a OK Records!</h2>
          <p>Hola <strong>${name}</strong>,</p>
          <p>Gracias por registrarte en OK Records. Para completar tu registro, por favor verifica tu dirección de correo electrónico haciendo clic en el siguiente enlace:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verificar mi cuenta
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            Este enlace expirará en 24 horas. Si no solicitaste esta cuenta, puedes ignorar este correo.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #888; font-size: 12px;">
            OK Records - Tu tienda de música favorita
          </p>
        </div>
      `
    };

    // ✅ SOLUCIÓN: Enviar email de forma asíncrona sin bloquear la respuesta
    let emailSent = false;
    let emailError = null;

    try {
      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log('✅ Email de verificación enviado a:', email);
    } catch (emailErr) {
      emailError = emailErr.message;
      console.error('❌ Error al enviar email de verificación:', emailErr);
      // No retornamos aquí, seguimos con la respuesta exitosa
    }

    // ✅ IMPORTANTE: Solo enviar UNA respuesta
    return res.status(201).json({
      message: 'Cliente registrado exitosamente',
      client: {
        id: savedClient._id,
        name: savedClient.name,
        email: savedClient.email,
        isVerified: savedClient.isVerified,
        createdAt: savedClient.createdAt
      },
      emailSent,
      emailError: emailError || null,
      verificationRequired: true,
      instructions: emailSent 
        ? 'Por favor revisa tu correo electrónico para verificar tu cuenta.'
        : 'Tu cuenta ha sido creada, pero hubo un problema enviando el email de verificación. Contacta al soporte.'
    });

  } catch (error) {
    console.error('❌ Error en registerClient:', error);
    
    // ✅ Asegurar que solo enviamos una respuesta de error
    if (!res.headersSent) {
      return res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
      });
    }
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        message: 'Token de verificación requerido'
      });
    }

    // Verificar y decodificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { clientId } = decoded;

    // Buscar cliente y verificar
    const client = await Customer.findById(clientId);
    
    if (!client) {
      return res.status(404).json({
        message: 'Cliente no encontrado'
      });
    }

    if (client.isVerified) {
      return res.status(200).json({
        message: 'La cuenta ya ha sido verificada',
        client: {
          id: client._id,
          name: client.name,
          email: client.email,
          isVerified: client.isVerified
        }
      });
    }

    // Marcar como verificado
    client.isVerified = true;
    client.verifiedAt = new Date();
    await client.save();

    return res.status(200).json({
      message: 'Email verificado exitosamente',
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
        isVerified: client.isVerified,
        verifiedAt: client.verifiedAt
      }
    });

  } catch (error) {
    console.error('❌ Error en verifyEmail:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({
        message: 'Token de verificación inválido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({
        message: 'Token de verificación expirado'
      });
    }

    if (!res.headersSent) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      });
    }
  }
};

const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'Email requerido'
      });
    }

    // Buscar cliente
    const client = await Customer.findOne({ email });
    
    if (!client) {
      return res.status(404).json({
        message: 'Cliente no encontrado'
      });
    }

    if (client.isVerified) {
      return res.status(400).json({
        message: 'La cuenta ya está verificada'
      });
    }

    // Generar nuevo token
    const verificationToken = jwt.sign(
      { clientId: client._id, email: client.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:4001'}/verify-email/${verificationToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'OK Records - Reenvío de verificación de cuenta',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Verificación de cuenta - OK Records</h2>
          <p>Hola <strong>${client.name}</strong>,</p>
          <p>Has solicitado un nuevo enlace de verificación para tu cuenta en OK Records.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verificar mi cuenta
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            Este enlace expirará en 24 horas.
          </p>
        </div>
      `
    };

    // Enviar email
    try {
      await transporter.sendMail(mailOptions);
      
      return res.status(200).json({
        message: 'Email de verificación reenviado exitosamente',
        instructions: 'Por favor revisa tu correo electrónico'
      });
    } catch (emailError) {
      console.error('❌ Error al reenviar email:', emailError);
      
      return res.status(500).json({
        message: 'Error al enviar el email de verificación',
        error: 'Por favor intenta más tarde'
      });
    }

  } catch (error) {
    console.error('❌ Error en resendVerificationEmail:', error);
    
    if (!res.headersSent) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      });
    }
  }
};


const registerClientsController = {
  registerClient,
  verifyEmail,
  resendVerificationEmail
};

export default registerClientsController;