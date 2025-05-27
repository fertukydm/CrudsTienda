import { Schema, model } from "mongoose";

const loginSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
     password:{
        type: String,
        require: true
    },
},    
  {
    timestamps: true,
    strict: false,
  }
);

export default model("login", loginSchema);