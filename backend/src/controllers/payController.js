import PayModel from "../models/pay.js";

const payController = {};

payController.getPay = async (req, res) => {
  try {
    const pay = await PayModel.find();
    res.json(pay);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener métodos de pago", error });
  }
};

// ✅ Solo una función insertPay
payController.insertPay = async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const newPay = new PayModel({ paymentMethod });
    await newPay.save();
    res.status(201).json({ message: "Método de pago guardado", data: newPay });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar", error });
  }
};

payController.deletePay = async (req, res) => {
  try {
    await PayModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Método de pago eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error });
  }
};

payController.updatePay = async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const updatedPay = await PayModel.findByIdAndUpdate(
      req.params.id,
      { paymentMethod },
      { new: true }
    );
    res.json({ message: "Método de pago actualizado", data: updatedPay });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar", error });
  }
};

export default payController;