import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs";         
import nodemailer from "nodemailer";     
import crypto from "crypto";             

import clientsModel from "../models/customer.js";
import { config } from "../config.js";

const registerClientsController = {};

// REGISTRO
registerClientsController.register = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  try {
    // Verificar si ya existe
    const existingClient = await clientsModel.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Client already exists" });
    }

    // Encriptar contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crear nuevo cliente (isVerified ya no se guarda en BD)
    const newClient = new clientsModel({
      name,
      lastName,
      email,
      password: passwordHash,
    });

    await newClient.save();

    // Crear código aleatorio
    const verificationCode = crypto.randomBytes(3).toString("hex");

    // Crear token con el código
    // En la función register, línea del token:
   const tokenCode = jsonwebtoken.sign(
     { email, verificationCode },
    config.jwt.secret, // ✅ Cambio: config.JWT.secret -> config.jwt.secret
    { expiresIn: "2h" }
   );

    // Guardar token en cookie
    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    // Configurar transporte de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailC.email_user,
        pass: config.emailC.email_pass,
      },
    });

    // Solución
const mailOptions = {
  from: config.emailC.email_user,
  to: email,
  subject: "Email verification code",
  text: `Your verification code is: ${verificationCode}. It expires in 2 hours.`,
};

    // Enviar correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email", error });
      }
      console.log("Email sent: " + info.response);
    });

    res.status(201).json({
      message: "Client registered. Please check your email to verify your account.",
    });

  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// VERIFICAR CÓDIGO
registerClientsController.verifyCodeEmail = async (req, res) => {
  const { requireCode } = req.body;
  const token = req.cookies.verificationToken;

  try {
   const decoded = jsonwebtoken.verify(token, config.jwt.secret);
    const { email, verificationCode: storedCode } = decoded;

    if (requireCode !== storedCode) {
      return res.status(400).json({ message: "Invalid code" });
    }

    res.clearCookie("verificationToken");

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in verification:", error);
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

export default registerClientsController;
