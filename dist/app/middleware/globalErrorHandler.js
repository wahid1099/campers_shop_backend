"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const AppError_1 = __importDefault(require("../error/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Somthing went wrong!!...";
    let errorSources = [
        {
            path: "",
            message: "Somthing went wrong!!...",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplieffiedError = (0, handleZodError_1.default)(err);
        statusCode = simplieffiedError === null || simplieffiedError === void 0 ? void 0 : simplieffiedError.statusCode;
        message = simplieffiedError === null || simplieffiedError === void 0 ? void 0 : simplieffiedError.message;
        errorSources = simplieffiedError === null || simplieffiedError === void 0 ? void 0 : simplieffiedError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
    });
};
exports.default = globalErrorHandler;
