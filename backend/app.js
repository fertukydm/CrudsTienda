import express from "express";
import cors from "cors";
import loginRoutes from "./src/routes/Login.js";
import dotenv from "dotenv";
import registerRoutes from "./src/routes/registerEmployee.js"

dotenv.config();

const app = express();

// Configura CORS solo UNA vez, así evitas conflictos
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/login", loginRoutes);
app.use("/api/registerEmployee", registerRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
