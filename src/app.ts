import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import applicationRoutes from "./routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["https://itvata.vercel.app/", "http://localhost:3000"],
  }),
);
app.use(cookieParser());
app.use("/api/v1", applicationRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: StatusCodes.OK,
    success: true,
    message: "Server is under construction!",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
