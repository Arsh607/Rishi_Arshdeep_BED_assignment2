import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *       properties:
 *         id:
 *           type: string
 *           example: "emp_101"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         position:
 *           type: string
 *           example: "Manager"
 *         department:
 *           type: string
 *           example: "Operations"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           example: "416-555-0199"
 *         branchId:
 *           type: integer
 *           example: 1
 */
export const employeeSchema = Joi.object({
  name: Joi.string().min(2).required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9\-]+$/).required(),
  branchId: Joi.number().integer().required(),
});
