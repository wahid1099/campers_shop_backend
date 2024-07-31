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
exports.ProductService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const product_model_1 = require("./product.model");
// create a  product
const crateProudctIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
// get all  products
const getAllProductFromDb = (searchQuery, sortDirection, category, price) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
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
    let sortCriteria = {};
    if (sortDirection === 1) {
        sortCriteria = { price: 1 };
    }
    else if (sortDirection === -1) {
        sortCriteria = { price: -1 };
    }
    const products = yield product_model_1.Product.find(query).sort(sortCriteria);
    return products;
});
// get a single product
const getSingleProudctFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const UpdateProductIntoDb = (prodcutId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(prodcutId);
    if (!prodcutId) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product Not Found");
    }
    const updateProduct = yield product_model_1.Product.findByIdAndUpdate(prodcutId, payload, {
        new: true,
    });
    return updateProduct;
});
const deleteProductFromDb = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product Not found");
    }
    const result = yield product_model_1.Product.findByIdAndDelete(productId);
    return result;
});
exports.ProductService = {
    crateProudctIntoDb,
    getAllProductFromDb,
    getSingleProudctFromDb,
    UpdateProductIntoDb,
    deleteProductFromDb,
};
