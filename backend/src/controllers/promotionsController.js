const promotionsController = {};
import promotions from "../models/promotions";
import promotionsController from "../models/promotions";


promotionsController.getPromotions = async (req, res) => {
  const promotions = await promotionsController.find();
  res.json(promotions);
};


promotionsController.insertPromotions = async (req, res) => {
  const { namePromotins, id_article, proce, discount, total  } = req.body;
  const newPromotions = new promotionsModel({ namePromotins, id_article, proce, discount, total });
  await newPromotions.save();
  res.json({ message: "Promotions saved" });
};


promotionsController.deletePromotions = async (req, res) => {
  await promotionsController.findByIdAndDelete(req.params.id);
  res.json({ message: "Promotions deleted" });
};


promotionsController.updatePromotions = async (req, res) => {
  const { namePromotins, id_article, proce, discount, total  } = req.body;
  const updatePromotions = await promotionsController.findByIdAndUpdate(
    req.params.id,
    { namePromotins, id_article, proce, discount, total  },
    { new: true }
  );
  res.json({ message: "promotions updated successfully" });
};

export default promotionsController;