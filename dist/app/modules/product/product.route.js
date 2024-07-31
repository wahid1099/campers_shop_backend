"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
router.post("/create-Product", (0, validateRequest_1.default)(product_validation_1.productValidationSchema.createProductValidationSchema), product_controller_1.ProductController.createProduct);
router.get("/", product_controller_1.ProductController.getAllProduct);
router.get("/:id", product_controller_1.ProductController.getSignleProduct);
router.put("/:id", (0, validateRequest_1.default)(product_validation_1.productValidationSchema.updateValidationSchema), product_controller_1.ProductController.updateProduct);
router.delete("/:id", product_controller_1.ProductController.deleteProduct);
exports.ProductRoute = router;
