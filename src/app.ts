import express, { Request, Response, NextFunction } from "express";
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

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err?.status || 500).json({ status: "error", message: err?.message || "Internal Server Error" });
});

export default app;
