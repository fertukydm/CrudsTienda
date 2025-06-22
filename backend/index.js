import { config } from "./src/config.js";
import app from "./app.js";
import connectDB from "./database.js";

async function main() {
  try {
    await connectDB(); // esta función debe hacer mongoose.connect(...)
    const port = config.PORT;
    app.listen(port, () => {
      console.log(`🌍 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
}

main();



