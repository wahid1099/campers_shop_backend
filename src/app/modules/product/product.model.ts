import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const ProductSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: { type: Number, required: [true, "Price is required"] },
  category: { type: String, required: [true, "Category is required"] },
  description: { type: String, required: [true, "Description is required"] },
  stock: { type: Number, required: [true, "Stock is required"] },
  rating: { type: Number, required: [true, "Rating is required"] },
  image: { type: String, required: [true, "Image is required"] },
});

export const Product = model<TProduct>("Product", ProductSchema);
