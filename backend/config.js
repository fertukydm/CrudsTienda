import dotenv from "dotenv";

dotenv.config();

export const config = {
  db: {
    URI: process.env.DB_URI || "mongodb://localhost:",
  },
  server: {
    port: process.env.PORT || 4000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secreto123",
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  },
  email: {
    email: "okrecords71@gmail.com",
    password: process.env.APP_PASSWORD_EMAIL,
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },

};