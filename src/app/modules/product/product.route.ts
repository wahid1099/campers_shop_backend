import express from "express";

import validRequest from "../../middleware/validateRequest";

import { ProductController } from "./product.controller";

import { productValidationSchema } from "./product.validation";

const router = express.Router();

router.post(
  "/create-Product",
  validRequest(productValidationSchema.createProductValidationSchema),
  ProductController.createProduct
);

router.get("/", ProductController.getAllProduct);
router.get("/:id", ProductController.getSignleProduct);
router.put(
  "/:id",
  validRequest(productValidationSchema.updateValidationSchema),
  ProductController.updateProduct
);

router.delete("/:id", ProductController.deleteProduct);

export const ProductRoute = router;
