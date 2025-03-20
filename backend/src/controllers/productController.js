const productController = {};
import productController from "../models/products";



productController.getProducts = async (req, res) => {
  const product = await productController.find();
  res.json(product);
}


productController.insertProduct = async (req, res) => {
  const { id_article, authorName,productName,descriptions, id_gerder,price  } = req.body;
  const newProduct = new productsModel({ id_article, authorName,productName,descriptions, id_gerder,price });
  await newProduct.save();
  res.json({ message: "Product saved" });
};


productController.deleteProduct = async (req, res) => {
  await productController.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};


productController.updateProduct = async (req, res) => {
  const { id_article, authorName,productName,descriptions, id_gerder,price  } = req.body;
  const updateProduct = await productController.findByIdAndUpdate(
    req.params.id,
    { id_article, authorName,productName,descriptions, id_gerder,price  },
    { new: true }
  );
  res.json({ message: "product updated successfully" });
};

export default productController;