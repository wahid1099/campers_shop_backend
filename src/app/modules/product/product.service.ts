import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
// create a  product
const crateProudctIntoDb = async (payload: TProduct) => {
  const result = await Product.create(payload);

  return result;
};
// get all  products
const getAllProductFromDb = async (
  searchQuery: string,
  sortDirection: number,
  category: string,
  price: number
) => {
  let query: any = {};

  if (searchQuery) {
    const searchRegex = new RegExp(searchQuery, "i");
    query.$or = [{ name: searchRegex }, { description: searchRegex }];
  }

  if (category) {
    query.category = category;
  }

  if (price > 0) {
    query.price = { $lte: price };
  }

  let sortCriteria: any = {};
  if (sortDirection === 1) {
    sortCriteria = { price: 1 };
  } else if (sortDirection === -1) {
    sortCriteria = { price: -1 };
  }

  const products = await Product.find(query).sort(sortCriteria);
  return products;
};
// get a single product
const getSingleProudctFromDb = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const UpdateProductIntoDb = async (
  prodcutId: string,
  payload: Partial<TProduct>
) => {
  const product = await Product.findById(prodcutId);

  if (!prodcutId) {
    throw new AppError(httpStatus.NOT_FOUND, "Product Not Found");
  }
  const updateProduct = await Product.findByIdAndUpdate(prodcutId, payload, {
    new: true,
  });
  return updateProduct;
};

const deleteProductFromDb = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product Not found");
  }
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const ProductService = {
  crateProudctIntoDb,
  getAllProductFromDb,
  getSingleProudctFromDb,
  UpdateProductIntoDb,
  deleteProductFromDb,
};
