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
 *           description: Auto-generated branch ID
 *           example: "branch_001"
 *         name:
 *           type: string
 *           description: Name of the branch
 *           example: "Downtown Service Center"
 *         address:
 *           type: string
 *           description: Full address of the branch
 *           example: "123 King Street W, Toronto, ON"
 *         phone:
 *           type: string
 *           description: Contact phone number of the branch
 *           example: "416-555-0123"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the branch was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the branch was last updated
 */

export const branchSchema = Joi.object({
  name: Joi.string().min(2).required(),
  address: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[0-9\-]+$/)
    .required()
});
