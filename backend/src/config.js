import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.DB_URI || "mongodb://localhost:27017/OKRECORDS",
  jwt: {
    secret: process.env.JWT_SECRET || "secreto123", // Si no está en .env, usa "secreto123"
    expiresIn: process.env.JWT_EXPIRES_IN || "30d", // Tiempo de expiración por defecto
  },
  email: {
    email: process.env.EMAIL || "okrecords71@gmail.com", // Correo de la aplicación
    password: process.env.APP_PASSWORD_EMAIL, // Contraseña de la aplicación
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
};
