import { Router } from "express";
const router = Router();

/**
 * @openapi
 * tags:
 *   name: System
 *   description: API health and system status endpoints
 */

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Check API health status
 *     description: Returns API operational status, uptime, timestamp, and version. Useful for monitoring and CI/CD health checks.
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is up and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 uptime:
 *                   type: number
 *                   description: System uptime in seconds
 *                   example: 1234.567
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-11-05T17:34:00.000Z"
 *                 version:
 *                   type: string
 *                   description: Current API version
 *                   example: "1.0.0"
 */
router.get("/", (_req, res) => {
  const payload = {
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };

  return res.status(200).json(payload);
});

export default router;
