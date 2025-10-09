import Joi from "joi";

export const employeeSchema = Joi.object({
  name: Joi.string().min(2).required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9\-]+$/).required(),
  branchId: Joi.number().integer().required()
});