import app from "./app.js";

import "./database.js";

import { config } from "./src/config.js";


async function main() {
  app.listen(config.PORT);
  console.log("Server running");
}

main();