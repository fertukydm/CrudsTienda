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
        type: Double,
        require: true,
    },

    state: {
    type: String,
    require: true,
    },

    total: {
        type:  Double ,
        require: true,
    }
    
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("ShoppingCart", shoppingCartSchema);