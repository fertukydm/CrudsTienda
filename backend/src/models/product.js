import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    id_article: {
      type: String,
      require: true,
    },
    authorName: {
      type: String,
      require: true,

    },
    productName: {
        type: String,
        require: true,
    },

    description: {
    type: String,
    require: true,
    },

    id_gender: {
        type:  String ,
        require: true,
    },
    price: {
        type:  Double ,
        require: true,
    }
    
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Product", productSchema);