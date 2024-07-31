import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import mongoose from "mongoose";

const getOrderIntoDb = async (payload: TOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updateProducts = [];

    for (const item of payload.items) {
      const productId = item._id;
      const orderQuantity = item.quantity;

      const updateProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $inc: { stock: -orderQuantity },
        },
        { new: true, session } // Include the session in the update operation
      );

      if (!updateProduct) {
        throw new Error(`Product not found with ID: ${productId}`);
      }

      updateProducts.push(updateProduct);
    }

    await session.commitTransaction();
    session.endSession();

    return updateProducts;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const OrderService = {
  getOrderIntoDb,
};
