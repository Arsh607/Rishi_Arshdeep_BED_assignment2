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
 *           description: Auto-generated employee ID
 *           example: "emp_101"
 *         name:
 *           type: string
 *           description: Full name of the employee
 *           example: "John Doe"
 *         position:
 *           type: string
 *           description: Job title or position
 *           example: "Operations Manager"
 *         department:
 *           type: string
 *           description: Department or team the employee belongs to
 *           example: "Customer Service"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee’s work email address
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           description: Contact phone number
 *           example: "416-555-0199"
 *         branchId:
 *           type: integer
 *           description: Foreign key linking the employee to a branch
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the record was last updated
 */

export const employeeSchema = Joi.object({
  name: Joi.string().min(2).required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9\-]+$/)
    .required(),
  branchId: Joi.number().integer().required()
});
