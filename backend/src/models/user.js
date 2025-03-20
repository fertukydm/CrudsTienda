import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    cod: {
      type: String,
    },
    mail: {
      type: String,
      require: true,
      min: 0,
    },
    password: {
      type: String,
      require: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("User", userSchema);
