import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app = express();

app.use(cors());

//parser
app.use(express.json());

//application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Campers Shop....");
});

app.use(globalErrorHandler);
// app.use(notFound);

export default app;
