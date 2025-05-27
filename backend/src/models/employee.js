import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    lastName: {
      type: String,
    },

    birthday: {
      type: Date,
      require: true,
    },

    email: {
      type: String,
    },

    address: {
      type: String,
    },

    password: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employee", employeeSchema);