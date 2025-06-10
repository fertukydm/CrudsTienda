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
    },

    address: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employee", employeeSchema);