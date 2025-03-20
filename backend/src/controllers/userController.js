// Creo un array de funciones
const userController = {};
import usermodels from "../models/user.js";

// SELECT
userController.getUser = async (req, res) => {
  const user = await usermodels.find();
  res.json(user);
};

// INSERT
userController.insertUser = async (req, res) => {
  const { name, cod, mail, password  } = req.body;
  const newUser = new usermodels({ name });
  await newUser.save();
  res.json({ message: "User saved" });
};

// DELETE
userController.deleteuser = async (req, res) => {
  await usermodels.findByIdAndDelete(req.params.id);
  res.json({ message: "user deleted" });
};

// UPDATE
userController.updateUser = async (req, res) => {
  const { name, cod, mail, password } = req.body;
  const updateUser = await usermodels.findByIdAndUpdate(
    req.params.id,
    { name, cod, mail, password },
    { new: true }
  );
  res.json({ message: "user updated successfully" });
};

export default userController;