import employeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound;
    let userType;

    // Opción 1: ADMIN (si tienes un admin hardcodeado en config)
    if (
      email === config.emailAdmin.email &&
      password === config.emailAdmin.password
    ) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      // Opción 2: EMPLEADO
      userFound = await employeeModel.findOne({ email });
      userType = "employee";

      if (!userFound) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Comparar contraseñas
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    }

    // Generar token
    jsonwebtoken.sign(
      { id: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) return res.status(500).json({ message: "Error al generar el token" });

        res.cookie("authToken", token);
        res.json({ message: "Login exitoso", token });
      }
    );
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default loginController;
