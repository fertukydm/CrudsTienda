import app from "./app.js";
import "./database.js";
import { config } from "./src/config.js";

async function main() {
  try {
    app.listen(config.PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

main();
