import { Schema, model } from "mongoose";

const customersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    phone: {
      type: String,
      required: false,
      trim: true
    },
    address: {
      type: String,
      required: false,
      trim: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationCode: {
      type: String,
      required: false
    },
    verificationCodeExpires: {
      type: Date,
      required: false
    },
    resetPasswordToken: {
      type: String,
      required: false
    },
    resetPasswordExpires: {
      type: Date,
      required: false
    }
  },
  {
    timestamps: true
  }
);


export default model("customers", customersSchema);
