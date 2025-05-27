const employeeController = {};
import employeeModel from "../models/employee.js";

// READ - Obtener todos los empleados
employeeController.getEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

// CREATE - Crear un nuevo empleado
employeeController.createEmployee = async (req, res) => {
  try {
    const { name, lastName, birthday, email, address, password } = req.body;
    const newEmployee = new employeeModel({
      name,
      lastName,
      birthday,
      email,
      address,
      password
    });
    await newEmployee.save();
    res.json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
};

// UPDATE - Actualizar empleado por ID
employeeController.updateEmployee = async (req, res) => {
  try {
    const { name, lastName, birthday, email, address, password } = req.body;
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      req.params.id,
      { name, lastName, birthday, email, address, password },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

// DELETE - Eliminar empleado por ID
employeeController.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await employeeModel.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

export default employeeController;
