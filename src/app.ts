import express, { type ErrorRequestHandler } from "express";
import morgan from "morgan";
import healthRoutes from "./api/v1/routes/healthRoutes";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import helmet from "helmet";
import cors from "cors";
import setupSwagger from "./config/swagger";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("Error occurred:", err);
  res.status((err as any)?.status || 500).json({
    status: "error",
    message: (err as any)?.message || "Internal Server Error"
  });
};

app.use(errorHandler);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) cb(null, true);
      else cb(new Error("CORS Not Allowed"));
    },
  })
);

setupSwagger(app);

export default app;
