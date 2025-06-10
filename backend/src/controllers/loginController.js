import employeesModel from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  try {
    let userFound;
    let userType;

    // Verificar si es el Admin
    if (email === config.admin.email && password === config.admin.password) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      // Verificar si es un empleado
      userFound = await employeesModel.findOne({ email });
      userType = userFound ? "employee" : null;
    }

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    }

    // Generar token JWT
    jsonwebtoken.sign(
      { id: userFound._id, userType },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
      (error, token) => {
        if (error) {
          return res.status(500).json({ message: "Error generando token" });
        }

        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        // 🔹 **Corrección: Enviar `userType` en la respuesta JSON**
        res.json({ message: "Login exitoso", token, userType });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export default loginController;
