import { Schema, model } from "mongoose";

const paySchema = new Schema({
  paymentMethod: {
    type: String,
    required: true,
  }
});

export default model("pay", paySchema); 
