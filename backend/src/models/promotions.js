
import { Schema, model } from "mongoose";

const promotionsSchema = new Schema(
  {
    namePromotions: {
      type: String,
      required: true,
    },
    id_article: {
      type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
    type: String,
    required: true,
    },
    total: {
        type:  Number ,
        required: true,
    }
    
  },
  {
    timestamps: true,
    strict: false,
  }
);
export default model("promotions", promotionsSchema);