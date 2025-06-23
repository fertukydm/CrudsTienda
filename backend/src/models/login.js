import { Schema, model } from "mongoose";

const loginSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
     password:{
        type: String,
        required: true
    },
},    
  {
    timestamps: true,
    strict: false,
  }
);

export default model("login", loginSchema);