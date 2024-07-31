import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";
import AppError from "../error/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Somthing went wrong!!...";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Somthing went wrong!!...",
    },
  ];
  if (err instanceof ZodError) {
    const simplieffiedError = handleZodError(err);
    statusCode = simplieffiedError?.statusCode;
    message = simplieffiedError?.message;
    errorSources = simplieffiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [{ path: "", message: err?.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};

export default globalErrorHandler;
