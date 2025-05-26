const payController = {};
import paymodels from "../models/pay";
 
payController.getPay = async (req, res) => {
  const pay = await paymodels.find();
  res.json(pay);
};
 
 
payController.insertPay = async (req, res) => {
  const { paymentMethod} = req.body;
  const newPay = new payModel({ paymentMethod });
  await newPay.save();
  res.json({ message: "Pay saved" });
};
 
 
payController.deletePay = async (req, res) => {
  await paymodels.findByIdAndDelete(req.params.id);
  res.json({ message: "pay deleted" });
};
 
 
payController.updatePay = async (req, res) => {
  const { paymentMethod } = req.body;
  const updatePay = await paymodels.findByIdAndUpdate(
    req.params.id,
    { paymentMethod },
    { new: true }
  );
  res.json({ message: "Pay updated successfully" });
};
 
export default payController;