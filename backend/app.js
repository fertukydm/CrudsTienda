import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import loginRoutes from "./src/routes/Login.js";
import registerRoutes from "./src/routes/registerEmployee.js";
import productRoutes from "./src/routes/Product.js";
import customerRoutes from "./src/routes/customer.js";
import registerClientsRoutes from "./src/routes/registerClients.js";
import contactRoutes from "./src/routes/contact.js";
import ReviewRoutes from "./src/routes/review.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecoveryRoutes.js";  // Nueva ruta

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',  // Añadir este puerto
    'http://localhost:3000',  // Otros puertos que puedas usar
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/login", loginRoutes);
app.use("/api/registerEmployee", registerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/registerClients", registerClientsRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/review", ReviewRoutes);

// Rutas de recuperación de contraseña
app.use("/api/passwordRecovery", passwordRecoveryRoutes);  // Ruta nueva

export default app;
