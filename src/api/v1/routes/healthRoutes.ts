import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
  const payload = {
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  };                    

  return res.status(200).json(payload);  
});

export default router;