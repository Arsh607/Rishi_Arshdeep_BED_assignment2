import express, { type ErrorRequestHandler } from "express";
import morgan from "morgan";
import healthRoutes from "./api/v1/routes/healthRoutes";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

// Unified error handler → always { status: "error", message: "..." }
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("Error occurred:", err);
  res.status((err as any)?.status || 500).json({
    status: "error",
    message: (err as any)?.message || "Internal Server Error"
  });
};

app.use(errorHandler);

export default app;
