import productsModel from "../models/product.js";

const productController = {};

// GET all products
productController.getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};

// INSERT product
productController.insertProduct = async (req, res) => {
  const { authorName, productName, description, price, imageUrl } = req.body;

  const newProduct = new productsModel({
    authorName,
    productName,
    description,
    price,
    imageUrl,
  });

  await newProduct.save();
  res.json({ message: "Product saved", product: newProduct });
};

// DELETE product
productController.deleteProduct = async (req, res) => {
  await productsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

// UPDATE product
productController.updateProduct = async (req, res) => {
  const { authorName, productName, description, price, imageUrl } = req.body;

  const updatedProduct = await productsModel.findByIdAndUpdate(
    req.params.id,
    {
      authorName,
      productName,
      description,
      price,
      imageUrl,
    },
    { new: true }
  );

  res.json({ message: "Product updated successfully", product: updatedProduct });
};

export default productController;
