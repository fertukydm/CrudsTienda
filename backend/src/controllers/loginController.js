// Creo un array de funciones
const loginController = {};
import loginmodels from "../routes/Login.js";

// SELECT
loginController.getLogin = async (req, res) => {
  const login = await loginmodels.find();
  res.json(login);
};

// INSERT
loginController.insertLogin = async (req, res) => {
  const { mail, password } = req.body;
  const newLogin = new loginmodels({ mail, password });
  await newLogin.save();
  res.json({ message: "Login saved" });
};

// DELETE
loginController.deleteLogin = async (req, res) => {
  await loginmodels.findByIdAndDelete(req.params.id);
  res.json({ message: "login deleted" });
};

// UPDATE
loginController.updateLogin = async (req, res) => {
  const { mail, password } = req.body;
  const updateLogin = await loginmodels.findByIdAndUpdate(
    req.params.id,
    { mail, password },
    { new: true }
  );
  res.json({ message: "login updated successfully" });
};

export default loginController;