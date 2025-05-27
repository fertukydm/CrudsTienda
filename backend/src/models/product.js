
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
        type:  Number ,
        require: true,
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

export default model("Product", productSchema);