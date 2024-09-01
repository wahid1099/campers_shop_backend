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
  const search = req.query.search as string | undefined;
  const sort = req.query.sort as string | undefined;
  const category = req.query.category as string | undefined;
  const price = req.query.price as string | undefined;

  const result = await ProductService.getAllProductFromDb(
    search || "",
    parseInt(sort || "0", 10),
    category || "",
    parseInt(price || "0", 10)
  );

  if (result.length === 0) {
    // If no products are found, send a 404 response with a custom message
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No products found",
      data: [],
    });
  }

  // If products are found, return them
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully!",
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
