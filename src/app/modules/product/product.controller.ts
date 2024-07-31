import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.crateProudctIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is created Suesscufully!!",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const { search, sort, category, price } = req.query;
  const result = await ProductService.getAllProductFromDb(
    search as string,
    parseInt(sort as string),
    category as string,
    parseInt(price as string)
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrived successfully !!",
    data: result,
  });
});

const getSignleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProudctFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is retrived successfully!!",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const result = await ProductService.UpdateProductIntoDb(productId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is updated successfully!!",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const prodcutId = req.params.id;
  const result = await ProductService.deleteProductFromDb(prodcutId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is deleted successfully!!",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  getSignleProduct,
  updateProduct,
  deleteProduct,
};
