"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import router from "./app/routes";
// import globalErrorHandler from "./app/middleware/globalErrorHandler";
// import notFound from "./app/middleware/notFound";
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
// app.use("/api", router);
app.get("/", (req, res) => {
    res.send("Welcome to Campers Shop");
});
// app.use(globalErrorHandler);
// app.use(notFound);
exports.default = app;
