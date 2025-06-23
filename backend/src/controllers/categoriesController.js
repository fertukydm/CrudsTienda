const categoriesController = {};
import categoriesModel from "../models/categories.js"; 

// SELECT
//  Solución
categoriesController.getCategories = async (req, res) => {
  try {
    const categories = await categoriesModel.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorías", error });
  }
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