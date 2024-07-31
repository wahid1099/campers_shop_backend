"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const product_model_1 = require("../product/product.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getOrderIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const updateProducts = [];
        for (const item of payload.items) {
            const productId = item._id;
            const orderQuantity = item.quantity;
            const updateProduct = yield product_model_1.Product.findByIdAndUpdate(productId, {
                $inc: { stock: -orderQuantity },
            }, { new: true, session } // Include the session in the update operation
            );
            if (!updateProduct) {
                throw new Error(`Product not found with ID: ${productId}`);
            }
            updateProducts.push(updateProduct);
        }
        yield session.commitTransaction();
        session.endSession();
        return updateProducts;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.OrderService = {
    getOrderIntoDb,
};
