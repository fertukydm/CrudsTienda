import { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema(
  {
    id_product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    id_categories: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    state: {
      type: String,
      required: true,
      enum: ['active', 'purchased', 'cancelled'],
      default: 'active'
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    }
  },
  {
    timestamps: true,
  }
);

export default model("shoppingCart", shoppingCartSchema);