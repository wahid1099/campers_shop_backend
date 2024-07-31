"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, enum: ["cashOnDelivery"], required: true },
    items: {
        type: [Object],
        required: true,
    },
});
exports.Order = (0, mongoose_1.model)("Order", OrderSchema);
