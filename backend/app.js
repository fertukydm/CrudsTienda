import express from "express";
import cors from "cors";
import loginRoutes from "./src/routes/Login.js";
import dotenv from "dotenv";
import registerRoutes from "./src/routes/registerEmployee.js"
import productRoutes from "./src/routes/Product.js"

dotenv.config();

const app = express();

// Configura CORS solo UNA vez, así evitas conflictos
// Configurar CORS para permitir solicitudes desde el frontend en localhost:5173
const corsOptions = {
  origin: 'http://localhost:5173',  // Cambia esto a tu dominio si lo necesitas
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Rutas

app.use("/api/login", loginRoutes);
app.use("/api/registerEmployee", registerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/pay", payRoutes);


export default app;
