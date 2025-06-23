import { Schema, model } from "mongoose";

const customersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,  // corregí require -> required
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Correo inválido']
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

export default model("customers", customersSchema);
