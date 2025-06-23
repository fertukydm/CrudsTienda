import dotenv from "dotenv";
dotenv.config();

console.log("JWT_EXPIRES_IN cargado:", process.env.JWT_EXPIRES_IN);

export const config = {
  PORT: process.env.PORT || 4001,
  MONGO_URI: process.env.DB_URI || "mongodb://localhost:27017/OKRECORDS",
  jwt: {
    secret: process.env.JWT_SECRET || "secreto123", // Si no está en .env, usa "secreto123"
    expiresIn: process.env.JWT_EXPIRES_IN || "30d", // Tiempo de expiración por defecto
  },
  email: {
    email: process.env.EMAIL || "okrecords71@gmail.com", // Correo de la aplicación
    password: process.env.APP_PASSWORD_EMAIL, // Contraseña de la aplicación
  },
    emailC: {
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
};
