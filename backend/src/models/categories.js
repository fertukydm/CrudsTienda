import { Schema, model } from "mongoose";

const categoriesSchema = new Schema(
  {
    gender: {
      type: String,
      require: true,
    },
    subgender: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("categories", categoriesSchema);
