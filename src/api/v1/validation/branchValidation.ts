import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           example: "branch_001"
 *         name:
 *           type: string
 *           example: "Downtown Service Center"
 *         address:
 *           type: string
 *           example: "123 King Street W"
 *         phone:
 *           type: string
 *           example: "416-555-0123"
 */
export const branchSchema = Joi.object({
  name: Joi.string().min(2).required(),
  address: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9\-]+$/).required(),
});
