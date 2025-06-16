import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) return res.status(401).json({ message: 'Access denied, token missing!' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Puedes almacenar los datos del usuario decodificados si los necesitas
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token!' });
  }
};

