import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    birthday: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Correo inválido']
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    }
  },
  {
    timestamps: true,
  }
);

export default model("employee", employeeSchema);
