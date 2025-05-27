
import { Schema, model } from "mongoose";

const promotionsSchema = new Schema(
  {
    namePromotions: {
      type: String,
      require: true,
    },
    id_article: {
      type: String,
    },
    price: {
        type: Number,
        require: true,
    },
    discount: {
    type: String,
    require: true,
    },
    total: {
        type:  Number ,
        require: true,
    }
    
  },
  {
    timestamps: true,
    strict: false,
  }
);
export default model("promotions", promotionsSchema);