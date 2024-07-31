"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
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
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
