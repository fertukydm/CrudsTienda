
import { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema(
  {
    id_product: {
      type: String,
      require: true,
    },
    id_categories: {
      type: String,
      require: true,

    },
    price: {
        type: String,
        require: true,
    },

    state: {
    type: String,
    require: true,
    },

    total: {
        type:  String ,
        require: true,
    }
    
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("shoppingCart", shoppingCartSchema);