"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty({ message: "Name is required" }),
        price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
        category: zod_1.z.string().nonempty({ message: "Category must not be empty" }),
        description: zod_1.z
            .string()
            .nonempty({ message: "Description must not be empty" }),
        stock: zod_1.z
            .number()
            .int()
            .nonnegative({ message: "Stock must be a non-negative integer" }),
        rating: zod_1.z
            .number()
            .min(0)
            .max(5, { message: "Rating must be between 0 to 5" }),
        image: zod_1.z.string().url({ message: "Each image must have a valid URL" }),
    }),
});
const updateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty({ message: "Name is required" }).optional(),
        price: zod_1.z
            .number()
            .positive({ message: "Price must be a postive number" })
            .optional(),
        category: zod_1.z
            .string()
            .nonempty({ message: "Category must not be empty" })
            .optional(),
        description: zod_1.z
            .string()
            .nonempty({ message: "Description must not be empty" })
            .optional(),
    }),
    stock: zod_1.z
        .number()
        .int()
        .nonnegative({ message: "Stock  must  be a non negetive integer" })
        .optional(),
    rating: zod_1.z
        .number()
        .min(0)
        .max(5, { message: "Rating must be between 0 to 5" })
        .optional(),
    image: zod_1.z
        .string()
        .url({ message: "Each image must have a valid URl" })
        .optional(),
});
exports.productValidationSchema = {
    createProductValidationSchema,
    updateValidationSchema,
};
