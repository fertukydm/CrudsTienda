import mongoose from "mongoose";
import { config } from "./src/config.js";

export default async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI); // 👈 Limpio y actualizado
    console.log("✅ Conectado a MongoDB correctamente");

    mongoose.connection.once("open", () => {
      console.log("📦 Conectado a la base de datos:", mongoose.connection.name);
    });
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    throw error;
  }
}
