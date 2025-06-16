import EmployeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
  console.log("POST /api/registerEmployee - body:", req.body);
  
  const { name, lastName, birthday, email, address, password } = req.body;

  try {
    // Validar datos obligatorios
    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Verificar si el empleado ya existe
    const existEmployee = await EmployeeModel.findOne({ email });
    if (existEmployee) {
      return res.status(409).json({ message: 'El empleado ya está registrado' });
    }

    // Encriptar contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crear nuevo empleado
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
          console.error("Error al generar token:", error);
          return res.status(500).json({ message: "Error al generar token" });
        }

        // Enviar token como cookie (opcional) y respuesta exitosa
        res.cookie("authToken", token, { httpOnly: true });
        res.status(201).json({ message: "Empleado registrado correctamente" });
      }
    );

  } catch (error) {
    console.error("Error al registrar empleado:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default registerEmployeesController;
