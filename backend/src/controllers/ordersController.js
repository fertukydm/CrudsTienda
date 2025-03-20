const ordersController = {};
import ordersController from "../models/orders";



ordersController.getOrders = async (req, res) => {
  const orders = await ordersController.find();
  res.json(orders);
}


ordersController.insertOrders = async (req, res) => {
  const { id_user, address, id_product, id_article, id_categories, phone, id_pay, price, state, total } = req.body;
  const newOrders = new ordersModel({ id_user, address, id_product, id_article, id_categories, phone, id_pay, price, state, total });
  await newOrders.save();
  res.json({ message: "Orders saved" });
};


ordersController.deleteOrders = async (req, res) => {
  await ordersController.findByIdAndDelete(req.params.id);
  res.json({ message: "Orders deleted" });
};


ordersController.updateOrders = async (req, res) => {
  const { id_user, address, id_product, id_article, id_categories, phone, id_pay, price, state, total  } = req.body;
  const updateOrders = await ordersController.findByIdAndUpdate(
    req.params.id,
    { id_user, address, id_product, id_article, id_categories, phone, id_pay, price, state, total  },
    { new: true }
  );
  res.json({ message: "Orders updated successfully" });
};

export default ordersController;