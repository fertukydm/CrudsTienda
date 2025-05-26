<<<<<<< HEAD
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
        type: Double,
        require: true,
    },
    discount: {
    type: Int,
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

=======
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
        type: Double,
        require: true,
    },
    discount: {
    type: Int,
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

>>>>>>> b55e80c (Aregglos)
export default model("Promotions", promotionsSchema);