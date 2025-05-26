<<<<<<< HEAD
import { Schema, model } from "mongoose";

const payShema = new Schema(
  {
    paymentMethod: {
      type: String,
      require: true,
    },
     },
  {
    timestamps: true,
    strict: false,
  }
);

=======
import { Schema, model } from "mongoose";

const payShema = new Schema(
  {
    paymentMethod: {
      type: String,
      require: true,
    },
     },
  {
    timestamps: true,
    strict: false,
  }
);

>>>>>>> b55e80c (Aregglos)
export default model("Article", payShema);