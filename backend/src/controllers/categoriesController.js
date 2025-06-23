const categoriesController = {};
import categoriesModel from "../models/categories.js"; 

// SELECT
categoriesController.getCategories = async (req, res) => {
  const categories = await categoriesModel.find(); 
};

// INSERT
categoriesController.insertCategories = async (req, res) => {
  const { gender, subgender } = req.body; 
  const newcategories = new categoriesModel({ gender, subgender }); 
  await newcategories.save();
  res.json({ message: "categorie saved" });
};

// DELETE
categoriesController.deleteCategories = async (req, res) => {
  await categoriesModel.findByIdAndDelete(req.params.id); 
  res.json({ message: "categories deleted" });
};

// UPDATE
categoriesController.updateCategories = async (req, res) => {
  const { gender, subgender } = req.body; 
  const updateCategories = await categoriesModel.findByIdAndUpdate(
    req.params.id,
    { gender, subgender },
    { new: true }
  );
  res.json({ message: "categorie updated successfully" });
};

export default categoriesController;