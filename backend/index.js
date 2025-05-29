import { config } from "./src/config.js";
import app from "./app.js"; // Importa app desde app.js
import "./database.js"

async function main() {
  const port = config.PORT
  app.listen(port)
  console.log("server on port"+port)
  
}

main()



