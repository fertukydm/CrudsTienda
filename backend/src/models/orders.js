import { Schema, model } from "mongoose";

const ordersSchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      ref: 'customers',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    id_product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    id_article: {
      type: String,
      required: true,
    },
    id_categories: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    id_pay: {
      type: Schema.Types.ObjectId,
      ref: 'pay',
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    state: {
      type: String,
      required: true,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
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

export default model("orders", ordersSchema);





