import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    authorName: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("product", productSchema);
