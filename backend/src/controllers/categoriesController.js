// Creo un array de funciones
const categoriesController = {};
import categoriesController from "../models/categories.js";

// SELECT
categoriesController.getCategories = async (req, res) => {
  const categories = await categoriesmodel.find();
  res.json(categories);
};

// INSERT
categoriesController.insertCategories = async (req, res) => {
  const { gender, subgender  } = req.body;
  const newcategories = new categoriesmodel({ name });
  await newcategories.save();
  res.json({ message: "categorie saved" });
};

// DELETE
categoriesController.deleteCategories = async (req, res) => {
  await categoriesmodel.findByIdAndDelete(req.params.id);
  res.json({ message: "categories deleted" });
};

// UPDATE
categoriesController.updateCategories = async (req, res) => {
  const { name } = req.body;
  const updateCategories = await categoriesmodel.findByIdAndUpdate(
    req.params.id,
    { gender, subgender },
    { new: true }
  );
  res.json({ message: "categorie updated successfully" });
};

export default categoriesController;