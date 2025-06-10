import express from "express";
import dotenv from "dotenv";
import loginController from "./controllers/loginController.js"; // Ajusta la ruta según corresponda

dotenv.config();
const app = express();

// Middleware para parsear cuerpos JSON
app.use(express.json());

// Rutas
app.post("/api/login", loginController.login);

// Iniciar el servidor
app.listen(process.env.PORT || 4001, () => {
  console.log(`Server on port ${process.env.PORT || 4001}`);
});
