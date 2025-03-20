import { Schema, model } from "mongoose";

const articleShema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
     },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Article", articleShema);