import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    category: z.string().nonempty({ message: "Category must not be empty" }),
    description: z
      .string()
      .nonempty({ message: "Description must not be empty" }),
    stock: z
      .number()
      .int()
      .nonnegative({ message: "Stock must be a non-negative integer" }),
    rating: z
      .number()
      .min(0)
      .max(5, { message: "Rating must be between 0 to 5" }),
    image: z.string().url({ message: "Each image must have a valid URL" }),
  }),
});
const updateValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: "Name is required" }).optional(),
    price: z
      .number()
      .positive({ message: "Price must be a positive number" })
      .optional(),
    category: z
      .string()
      .nonempty({ message: "Category must not be empty" })
      .optional(),
    description: z
      .string()
      .nonempty({ message: "Description must not be empty" })
      .optional(),
    stock: z
      .number()
      .int()
      .nonnegative({ message: "Stock must be a non-negative integer" })
      .optional(),
    rating: z
      .number()
      .min(0)
      .max(5, { message: "Rating must be between 0 to 5" })
      .optional(),
    image: z
      .string()
      .url({ message: "Each image must have a valid URL" })
      .optional(),
  }),
});

export const productValidationSchema = {
  createProductValidationSchema,
  updateValidationSchema,
};
