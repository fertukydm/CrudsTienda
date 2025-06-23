const customersController = {};
import customersModel from "../models/customers.js";

// SELECT
customersController.getcustomers = async (req, res) => {
  try {
    const customers = await customersModel.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes", error });
  }
};

// INSERT
customersController.createcustomers = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    const newcustomer = new customersModel({ name, lastName, email, password });
    await newcustomer.save();

    res.status(201).json({ message: "Customer saved" });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar cliente", error });
  }
};

// DELETE
customersController.deletecustomers = async (req, res) => {
  try {
    const deletedcustomer = await customersModel.findByIdAndDelete(req.params.id);
    if (!deletedcustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cliente", error });
  }
};

// UPDATE
customersController.updatecustomers = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    const updatedCustomer = await customersModel.findByIdAndUpdate(
      req.params.id,
      { name, lastName, email, password },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer updated", customer: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cliente", error });
  }
};

export default customersController;
