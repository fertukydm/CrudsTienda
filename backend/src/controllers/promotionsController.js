const promotionsController = {};
import promotionsModel from "../models/promotions.js"; // ✅ Cambio: promotions -> promotionsModel

promotionsController.getPromotions = async (req, res) => {
  const promotions = await promotionsModel.find(); // ✅ Cambio: promotionsController -> promotionsModel
  res.json(promotions);
};

promotionsController.insertPromotions = async (req, res) => {
  const { namePromotions, id_article, price, discount, total } = req.body; // ✅ Cambio: namePromotins -> namePromotions, proce -> price
  const newPromotions = new promotionsModel({ namePromotions, id_article, price, discount, total });
  await newPromotions.save();
  res.json({ message: "Promotions saved" });
};

promotionsController.deletePromotions = async (req, res) => {
  await promotionsModel.findByIdAndDelete(req.params.id); // ✅ Cambio: promotionsController -> promotionsModel
  res.json({ message: "Promotions deleted" });
};

promotionsController.updatePromotions = async (req, res) => {
  const { namePromotions, id_article, price, discount, total } = req.body; // ✅ Cambio: namePromotins -> namePromotions, proce -> price
  const updatePromotions = await promotionsModel.findByIdAndUpdate(
    req.params.id,
    { namePromotions, id_article, price, discount, total },
    { new: true }
  );
  res.json({ message: "promotions updated successfully" });
};

export default promotionsController;