"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ordervalidation = void 0;
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty({ message: "Name is required" }),
        email: zod_1.z.string().email({ message: "Invalid Email adress" }),
        phone: zod_1.z.string().nonempty({ message: "Phone no is required" }),
        address: zod_1.z.string().nonempty({ message: "Address is required" }),
        paymentMethod: zod_1.z.enum(["cashOnDelivery"], {
            message: "Invalid payment method",
        }),
    }),
});
exports.Ordervalidation = {
    orderValidationSchema,
};
