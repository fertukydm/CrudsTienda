import { config } from "./src/config.js";
import app from "./app.js";
import connectDB from "./database.js";

async function main() {
  try {
    await connectDB(); // Esperamos la conexión a la DB antes de iniciar el servidor
    const port = config.PORT;
    app.listen(port, () => {
      console.log(`🌍 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1); // Detiene el servidor si hay un error crítico
  }
}

main();



