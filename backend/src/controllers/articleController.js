// Creo un array de funciones
const articleController = {};
import articlemodels from "../models/article.js";

// SELECT
articleController.getProducts = async (req, res) => {
  const products = await articlemodels.find();
  res.json(article);
};

// INSERT
articleController.insertArticle = async (req, res) => {
  const { name  } = req.body;
  const newArticle = new productsModel({ name });
  await newArticle.save();
  res.json({ message: "Article saved" });
};

// DELETE
articleController.deleteArticle = async (req, res) => {
  await articlemodels.findByIdAndDelete(req.params.id);
  res.json({ message: "article deleted" });
};

// UPDATE
articleController.updateArticle = async (req, res) => {
  const { name } = req.body;
  const updateArticle = await articlemodels.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  res.json({ message: "article updated successfully" });
};

export default articleController;