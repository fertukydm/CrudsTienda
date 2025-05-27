
import { Schema, model } from "mongoose";

const payShema = new Schema(
  {
    paymentMethod: {
      type: String,
      require: true,
    },
     },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("pay", payShema);