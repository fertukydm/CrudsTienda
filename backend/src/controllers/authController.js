import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Simulación de base de datos de usuarios
let users = [
  {
    id: 1,
    name: 'Admin',
    lastName: 'Sistema',
    email: 'admin@okrecords.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Usuario',
    lastName: 'Demo',
    email: 'usuario@okrecords.com',
    password: 'usuario123',
    role: 'user',
    createdAt: new Date().toISOString()
  }
];

let clients = [];
let employees = [];
let userIdCounter = 3;
let resetTokens = []; // Tokens temporales para recuperación

// Función auxiliar para validar emails
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Función para generar un token (base64) para autenticar usuarios
const generateToken = (user) => {
  return Buffer.from(JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role,
    timestamp: Date.now()
  })).toString('base64');
};

// Función para encontrar usuarios por email y contraseña
const findUserByEmail = (email, password) => {
  let user = users.find(u => u.email === email && u.password === password);
  if (user) return { user, type: 'admin' };

  user = clients.find(u => u.email === email && u.password === password);
  if (user) return { user, type: 'client' };

  user = employees.find(u => u.email === email && u.password === password);
  if (user) return { user, type: 'employee' };

  return null;
};

// 🚀 Configuración de nodemailer para envío de correos
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const authController = {
  // --- LOGIN ---
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos' });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Formato de email inválido' });
      }

      const result = findUserByEmail(email, password);
      if (!result) {
        return res.status(401).json({ success: false, message: 'Email o contraseña incorrectos' });
      }

      const { user, type } = result;
      const token = generateToken({ ...user, role: type });

      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        user: {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          role: type
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
    }
  },

  // --- REGISTRO CLIENTE ---
  registerClient: async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;

      if (!name || !lastName || !email || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Formato de email inválido' });
      }

      if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' });
      }

      const emailExists = users.some(u => u.email === email) ||
                          clients.some(u => u.email === email) ||
                          employees.some(u => u.email === email);

      if (emailExists) {
        return res.status(409).json({ success: false, message: 'El email ya está registrado' });
      }

      const newClient = {
        id: userIdCounter++,
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password,
        createdAt: new Date().toISOString()
      };

      clients.push(newClient);

      res.status(201).json({
        success: true,
        message: 'Cliente registrado exitosamente.',
        user: {
          id: newClient.id,
          name: newClient.name,
          lastName: newClient.lastName,
          email: newClient.email
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al registrar cliente', error: error.message });
    }
  },

  // --- REGISTRO EMPLEADO ---
  registerEmployee: async (req, res) => {
    try {
      const { name, lastName, birthday, email, address, password } = req.body;

      if (!name || !lastName || !email || !password || !address) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Formato de email inválido' });
      }

      if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' });
      }

      if (birthday && new Date(birthday) > new Date()) {
        return res.status(400).json({ success: false, message: 'La fecha de nacimiento no puede ser en el futuro' });
      }

      const emailExists = users.some(u => u.email === email) ||
                          clients.some(u => u.email === email) ||
                          employees.some(u => u.email === email);

      if (emailExists) {
        return res.status(409).json({ success: false, message: 'El email ya está registrado' });
      }

      const newEmployee = {
        id: userIdCounter++,
        name: name.trim(),
        lastName: lastName.trim(),
        birthday: birthday || null,
        email: email.toLowerCase().trim(),
        address: address.trim(),
        password,
        createdAt: new Date().toISOString()
      };

      employees.push(newEmployee);

      res.status(201).json({
        success: true,
        message: 'Empleado registrado exitosamente.',
        employee: {
          id: newEmployee.id,
          name: newEmployee.name,
          lastName: newEmployee.lastName,
          email: newEmployee.email
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al registrar empleado', error: error.message });
    }
  },

  // --- OBTENER TODOS LOS USUARIOS ---
  getAllUsers: async (req, res) => {
    try {
      const allUsers = [
        ...users.map(u => ({ ...u, type: 'admin' })),
        ...clients.map(u => ({ ...u, type: 'client' })),
        ...employees.map(u => ({ ...u, type: 'employee' }))
      ];

      const safeUsers = allUsers.map(({ password, ...user }) => user);

      res.status(200).json({
        success: true,
        users: safeUsers,
        total: safeUsers.length
      });

    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
    }
  },

  // --- CERRAR SESIÓN ---
  logout: async (req, res) => {
    try {
      res.status(200).json({ success: true, message: 'Sesión cerrada exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al cerrar sesión', error: error.message });
    }
  },

  // --- DEBUG ---
  debugUsers: async (req, res) => {
    try {
      res.json({
        success: true,
        debug: {
          admins: users.length,
          clients: clients.length,
          employees: employees.length
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // 🔐 RECUPERACIÓN DE CONTRASEÑA -----------------------

  // 1️⃣ Enviar código por correo
  sendRecoveryEmail: async (req, res) => {
    const { email } = req.body;

    const user = [...users, ...clients, ...employees].find(u => u.email === email);
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutos

    resetTokens.push({ email, code, expiresAt });

    transporter.sendMail({
      from: `"OK Records" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Código de recuperación de contraseña',
      text: `Tu código de recuperación es: ${code}`
    });

    res.json({ success: true, message: 'Código de recuperación enviado' });
  },

  // 2️⃣ Verificar código
  verifyRecoveryCode: (req, res) => {
    const { email, code } = req.body;
    const token = resetTokens.find(t => t.email === email && t.code === code);

    if (!token || token.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: 'Código inválido o expirado' });
    }

    res.json({ success: true, message: 'Código verificado' });
  },

  // 3️⃣ Resetear contraseña
  resetPassword: (req, res) => {
    const { email, code, newPassword } = req.body;
    const tokenIndex = resetTokens.findIndex(t => t.email === email && t.code === code);

    if (tokenIndex === -1 || resetTokens[tokenIndex].expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: 'Código inválido o expirado' });
    }

    const user = [...users, ...clients, ...employees].find(u => u.email === email);
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

    user.password = newPassword;
    resetTokens.splice(tokenIndex, 1);

    res.json({ success: true, message: 'Contraseña actualizada' });
  }
};

export default authController;
