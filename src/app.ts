import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { StatusCodes } from "http-status-codes";

import applicationRoutes from "./routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

app.use(express.json());
app.set("trust proxy", true);


app.use(
    cors({
        origin: (origin, callback) => {
            // origin না থাকলে allow
            if (!origin) {
                return callback(null, true);
            }

            // Localhost এবং যেকোনো localhost subdomain
            const isLocalhost =
                /^http:\/\/([a-zA-Z0-9-]+\.)?localhost:3000$/.test(
                    origin
                );

            // Production এবং যেকোনো production subdomain
            const isProduction =
                /^https:\/\/([a-zA-Z0-9-]+\.)?itvata\.com$/.test(
                    origin
                );

            // Vercel frontend
            const isVercel =
                origin === "https://itvata.vercel.app";

            if (
                isLocalhost ||
                isProduction ||
                isVercel
            ) {
                return callback(null, true);
            }

            return callback(
                new Error("Not allowed by CORS")
            );
        },

        credentials: true,
    })
);
app.use(cookieParser());

// Serve static files from root/uploads
app.use("/api/v1/uploads", express.static(path.join(process.cwd(), "uploads")));

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
