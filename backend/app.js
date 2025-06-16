import express from "express";
import cors from "cors";
import loginRoutes from "./src/routes/Login.js";
import dotenv from "dotenv";
import registerRoutes from "./src/routes/registerEmployee.js"
import productRoutes from "./src/routes/Product.js"

dotenv.config();

const app = express();

// Configura CORS solo UNA vez, así evitas conflictos
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));


// Middleware para parsear JSON
app.use(express.json());

// Rutas

app.use("/api/login", loginRoutes);
app.use("/api/registerEmployee", registerRoutes);
app.use("/api/products", productRoutes);


export default app;
