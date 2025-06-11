import mongoose from "mongoose";
import { config } from "./src/config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ DB is connected");
  } catch (error) {
    console.error("❌ Error connecting to DB:", error);
    process.exit(1); // Detiene el servidor si hay un error crítico
  }
};

// Eventos de conexión
mongoose.connection.on("disconnected", () => {
  console.log("🔴 DB is disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("⚠️ Database error:", error);
});

export default connectDB;
