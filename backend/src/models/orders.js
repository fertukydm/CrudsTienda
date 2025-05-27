
import { Schema, model } from "mongoose";

const ordersSchema = new Schema(
  {
    id_user: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,

    },
    id_product: {
        type: String,
        require: true,
    },

    id_article: {
    type: String,
    require: true,
    },

    id_categories: {
        type:  String ,
        require: true,
    },
    phone: {
        type:  String ,
        require: true,
    }
    ,
    id_pay: {
        type:  String ,
        require: true,
    }
    ,
    price: {
        type:  Number ,
        require: true,
    }
    ,
    state: {
        type:  String ,
        require: true,
    }
    ,
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
export default model("orders", ordersSchema);





