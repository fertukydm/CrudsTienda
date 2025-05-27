
import mongoose from "mongoose";

import { config } from "./src/config.js";


mongoose.connect(config.MONGO_URI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB is connected");
});

connection.on("disconnected", () => {
  console.log("Db is disconnected");
});

// Veo si hay un error
connection.on("error", (error) => {
  console.log("error found" + error);
});
