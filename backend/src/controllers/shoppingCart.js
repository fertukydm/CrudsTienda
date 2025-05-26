const ShoppingCartController = {};
import ShoppingCartController from "../models/shoppingCart";
 
 
 
ShoppingCartController.getShoppingCart = async (req, res) => {
  const ShoppingCart = await ShoppingCartController.find();
  res.json(ShoppingCart);
}
 
 
ShoppingCartController.insertShoppingCart = async (req, res) => {
  const { id_product, id_categories, price, state, total  } = req.body;
  const newShoppingCart = new ShoppingCartModel({ id_product, id_categories, price, state, total });
  await newShoppingCart.save();
  res.json({ message: "ShoppingCart saved" });
};
 
 
ShoppingCartController.deleteShoppingCart = async (req, res) => {
  await ShoppingCartController.findByIdAndDelete(req.params.id);
  res.json({ message: "ShoppingCart deleted" });
};
 
 
ShoppingCartController.updateShoppingCart = async (req, res) => {
  const { id_product, id_categories, price, state, total   } = req.body;
  const updateShoppingCart = await ShoppingCartController.findByIdAndUpdate(
    req.params.id,
    { id_product, id_categories, price, state, total   },
    { new: true }
  );
  res.json({ message: "ShoppingCart updated successfully" });
};
 
export default ShoppingCartController;