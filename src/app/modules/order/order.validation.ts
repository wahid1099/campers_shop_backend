import { z } from "zod";

const orderValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid Email adress" }),
    phone: z.string().nonempty({ message: "Phone no is required" }),
    address: z.string().nonempty({ message: "Address is required" }),
    paymentMethod: z.enum(["cashOnDelivery"], {
      message: "Invalid payment method",
    }),
  }),
});

export const Ordervalidation = {
  orderValidationSchema,
};
