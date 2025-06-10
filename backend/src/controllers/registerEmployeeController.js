import EmployeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";


const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
  console.log("POST /api/registerEmployee - body:", req.body);
  
  const { name, lastName, birthday, email, address, password } = req.body;

  try {
    // Verificar si el empleado ya existe
    const existEmployee = await EmployeeModel.findOne({ email });
    if (existEmployee) {
      return res.status(400).json({ message: "Empleado ya existe" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crear nuevo empleado con los campos que sí existen en el esquema
    const newEmployee = new EmployeeModel({
      name,
      lastName,
      birthday,
      email,
      address,
      password: passwordHash,
    });

    await newEmployee.save();

    // Generar token JWT
    jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Error al generar token" });
        }
        res.cookie("authToken", token);
        res.status(201).json({ message: "Empleado registrado", token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default registerEmployeesController;
