

// Simulación de base de datos de usuarios
let users = [
    {
      id: 1,
      name: 'Admin',
      lastName: 'Sistema',
      email: 'admin@okrecords.com',
      password: 'admin123', // En producción, esto debería estar hasheado
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
  
  // Separar los arrays por tipo de usuario
  let clients = [];
  let employees = [];
  let userIdCounter = 3;
  
  // Función auxiliar para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  
  const generateToken = (user) => {
    return Buffer.from(JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      timestamp: Date.now()
    })).toString('base64');
  };
 
  const findUserByEmail = (email, password) => {
    console.log('🔍 Buscando usuario con email:', email);
    console.log('📊 Estado actual de usuarios:');
    console.log('  - Admins:', users.length);
    console.log('  - Clientes:', clients.length);
    console.log('  - Empleados:', employees.length);
  
    // Buscar en usuarios admin
    let user = users.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('✅ Usuario encontrado en admins:', user.email);
      return { user, type: 'admin' };
    }
  
    // Buscar en clientes
    user = clients.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('✅ Usuario encontrado en clientes:', user.email);
      return { user, type: 'client' };
    }
  
    // Buscar en empleados
    user = employees.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('✅ Usuario encontrado en empleados:', user.email);
      return { user, type: 'employee' };
    }
  
    console.log('❌ Usuario no encontrado');
    return null;
  };
  
  const authController = {
    

    login: async (req, res) => {
      try {
        console.log(' Controller: Procesando login');
        console.log(' Datos recibidos:', { email: req.body.email, password: '***' });
        
        const { email, password } = req.body;
        
        // Validaciones básicas
        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: 'Email y contraseña son requeridos'
          });
        }
        
        if (!validateEmail(email)) {
          return res.status(400).json({
            success: false,
            message: 'Formato de email inválido'
          });
        }
        
        // Buscar usuario
        const result = findUserByEmail(email, password);
        
        if (!result) {
          console.log('❌ Credenciales incorrectas para:', email);
          return res.status(401).json({
            success: false,
            message: 'Email o contraseña incorrectos'
          });
        }
        
        const { user, type } = result;
        
        // Generar token
        const token = generateToken({ ...user, role: type });
        
        console.log(' Login exitoso para:', email, 'Tipo:', type);
        
        res.status(200).json({
          success: true,
          message: 'Inicio de sesión exitoso',
          token: token,
          user: {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: type
          }
        });
        
      } catch (error) {
        console.error('❌ Error en login:', error);
        res.status(500).json({
          success: false,
          message: 'Error interno del servidor',
          error: error.message
        });
      }
    },
  

    registerClient: async (req, res) => {
      try {
        console.log('👥 Controller: Registrando cliente');
        console.log('📦 Datos recibidos:', req.body);
        
        const { name, lastName, email, password } = req.body;
        
        // Validaciones
        if (!name || !lastName || !email || !password) {
          return res.status(400).json({
            success: false,
            message: 'Todos los campos son requeridos'
          });
        }
        
        if (!validateEmail(email)) {
          return res.status(400).json({
            success: false,
            message: 'Formato de email inválido'
          });
        }
        
        if (password.length < 6) {
          return res.status(400).json({
            success: false,
            message: 'La contraseña debe tener al menos 6 caracteres'
          });
        }
        
        // Verificar si el email ya existe en TODOS los arrays
        const emailExists = users.some(u => u.email === email) ||
                            clients.some(u => u.email === email) ||
                            employees.some(u => u.email === email);
        
        if (emailExists) {
          return res.status(409).json({
            success: false,
            message: 'El email ya está registrado'
          });
        }
        
        // Crear nuevo cliente
        const newClient = {
          id: userIdCounter++,
          name: name.trim(),
          lastName: lastName.trim(),
          email: email.toLowerCase().trim(),
          password: password, // En producción, hashear la contraseña
          createdAt: new Date().toISOString()
        };
        
        clients.push(newClient);
        
        console.log(' Cliente registrado exitosamente:', newClient.email);
        console.log(' Total de clientes ahora:', clients.length);
        
        res.status(201).json({
          success: true,
          message: 'Cliente registrado exitosamente. Ahora puedes iniciar sesión.',
          user: {
            id: newClient.id,
            name: newClient.name,
            lastName: newClient.lastName,
            email: newClient.email
          }
        });
        
      } catch (error) {
        console.error('❌ Error en registerClient:', error);
        res.status(500).json({
          success: false,
          message: 'Error interno del servidor al registrar cliente',
          error: error.message
        });
      }
    },
  

    registerEmployee: async (req, res) => {
      try {
        console.log(' Controller: Registrando empleado');
        console.log(' Datos recibidos:', req.body);
        
        const { name, lastName, birthday, email, address, password } = req.body;
        
        // Validaciones
        if (!name || !lastName || !email || !password || !address) {
          return res.status(400).json({
            success: false,
            message: 'Todos los campos son requeridos'
          });
        }
        
        if (!validateEmail(email)) {
          return res.status(400).json({
            success: false,
            message: 'Formato de email inválido'
          });
        }
        
        if (password.length < 6) {
          return res.status(400).json({
            success: false,
            message: 'La contraseña debe tener al menos 6 caracteres'
          });
        }
        
        // Validar fecha de nacimiento
        if (birthday) {
          const birthDate = new Date(birthday);
          const today = new Date();
          if (birthDate > today) {
            return res.status(400).json({
              success: false,
              message: 'La fecha de nacimiento no puede ser en el futuro'
            });
          }
        }
        
        // Verificar si el email ya existe
        const emailExists = users.some(u => u.email === email) ||
                            clients.some(u => u.email === email) ||
                            employees.some(u => u.email === email);
        
        if (emailExists) {
          return res.status(409).json({
            success: false,
            message: 'El email ya está registrado'
          });
        }
        
        // Crear nuevo empleado
        const newEmployee = {
          id: userIdCounter++,
          name: name.trim(),
          lastName: lastName.trim(),
          birthday: birthday || null,
          email: email.toLowerCase().trim(),
          address: address.trim(),
          password: password, // En producción, hashear la contraseña
          createdAt: new Date().toISOString()
        };
        
        employees.push(newEmployee);
        
        console.log(' Empleado registrado exitosamente:', newEmployee.email);
        console.log(' Total de empleados ahora:', employees.length);
        
        res.status(201).json({
          success: true,
          message: 'Empleado registrado exitosamente. Ahora puede iniciar sesión.',
          employee: {
            id: newEmployee.id,
            name: newEmployee.name,
            lastName: newEmployee.lastName,
            email: newEmployee.email,
            address: newEmployee.address,
            birthday: newEmployee.birthday
          }
        });
        
      } catch (error) {
        console.error('❌ Error en registerEmployee:', error);
        res.status(500).json({
          success: false,
          message: 'Error interno del servidor al registrar empleado',
          error: error.message
        });
      }
    },
  
    
    getAllUsers: async (req, res) => {
      try {
        console.log('📋 Controller: Obteniendo todos los usuarios');
        
        const allUsers = [
          ...users.map(u => ({ ...u, type: 'admin' })),
          ...clients.map(u => ({ ...u, type: 'client' })),
          ...employees.map(u => ({ ...u, type: 'employee' }))
        ];
        
   
        const safeUsers = allUsers.map(({ password, ...user }) => user);
        
        res.status(200).json({
          success: true,
          users: safeUsers,
          total: safeUsers.length,
          stats: {
            admins: users.length,
            clients: clients.length,
            employees: employees.length
          }
        });
        
      } catch (error) {
        console.error('❌ Error en getAllUsers:', error);
        res.status(500).json({
          success: false,
          message: 'Error al obtener usuarios',
          error: error.message
        });
      }
    },
  

    logout: async (req, res) => {
      try {
        console.log('🚪 Controller: Cerrando sesión');
        
      
        
        res.status(200).json({
          success: true,
          message: 'Sesión cerrada exitosamente'
        });
        
      } catch (error) {
        console.error('❌ Error en logout:', error);
        res.status(500).json({
          success: false,
          message: 'Error al cerrar sesión',
          error: error.message
        });
      }
    },
  
 
    debugUsers: async (req, res) => {
      try {
        res.json({
          success: true,
          debug: {
            admins: users.length,
            clients: clients.length,
            employees: employees.length,
            clientsList: clients.map(c => ({ id: c.id, email: c.email, name: c.name })),
            adminsList: users.map(u => ({ id: u.id, email: u.email, name: u.name }))
          }
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  };
  
  export default authController;