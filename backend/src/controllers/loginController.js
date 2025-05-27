// loginController.js
import employeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";


const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await employeeModel.findOne({ email });
    if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    jsonwebtoken.sign(
      { id: userFound._id, userType: "employee" },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (err, token) => {
        if (err) return res.status(500).json({ message: "Error generando token" });

        res.cookie("authToken", token, {
          httpOnly: true,
          secure: false, // true si usas HTTPS
          sameSite: "lax",
        });

        res.json({ message: "Login exitoso" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export default loginController;
