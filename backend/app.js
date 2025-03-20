import express from "express";
import ArticleRouter from "./src/routes/Article.js";

const app = express();
app.use(express.json());

connectDB();

routes(app);

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));



app.use(express.json());

app.use("/api/Article", ArticleRouter);


export default app;