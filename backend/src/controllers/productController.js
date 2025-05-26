import productsModel from "../models/product.js";
 
const productController = {};
 
// GET all products
productController.getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};
 
// INSERT product
productController.insertProduct = async (req, res) => {
  const { id_article, authorName, productName, description, id_gender, price, imageUrl } = req.body;
 
  const newProduct = new productsModel({
    id_article,
    authorName,
    productName,
    description,
    id_gender,
    price,
    imageUrl,
  });
 
  await newProduct.save();
  res.json({ message: "Product saved" });
};
 
// DELETE product
productController.deleteProduct = async (req, res) => {
  await productsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
 
// UPDATE product
productController.updateProduct = async (req, res) => {
  const { id_article, authorName, productName, description, id_gender, price, imageUrl } = req.body;
 
  const updatedProduct = await productsModel.findByIdAndUpdate(
    req.params.id,
    {
      id_article,
      authorName,
      productName,
      description,
      id_gender,
      price,
      imageUrl,
    },
    { new: true }
  );
 
  res.json({ message: "Product updated successfully" });
};
 
export default productController;