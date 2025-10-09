import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../models/response";
import * as service from "../services/employeeService";

export const getAll = (_req: Request, res: Response) => {
  const employees = service.listEmployees();
  return res.status(200).json(successResponse(employees, "All employees fetched successfully"));
};

export const getById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json(errorResponse("Invalid employee ID"));
  }

  const employee = service.getEmployeeById(id);
  if (!employee) {
    return res.status(404).json(errorResponse("Employee not found"));
  }

  return res.status(200).json(successResponse(employee, "Employee details fetched"));
};

export const create = (req: Request, res: Response, next: NextFunction) => {
  const { name, position, department, email, phone, branchId } = req.body || {};
  const missing =
    !name || !position || !department || !email || !phone || typeof branchId !== "number";

  if (missing) {
    return res.status(400).json(errorResponse("Missing required fields"));
  }

  try {
    const created = service.createEmployee({
      name,
      position,
      department,
      email,
      phone,
      branchId
    });
    return res.status(201).json(successResponse(created, "Employee created successfully"));
  } catch (err) {
    return next(err);
  }
};

export const update = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json(errorResponse("Invalid employee ID"));
  }

  const updated = service.updateEmployee(id, req.body ?? {});
  if (!updated) {
    return res.status(404).json(errorResponse("Employee not found"));
  }

  return res.status(200).json(successResponse(updated, "Employee updated successfully"));
};

export const remove = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json(errorResponse("Invalid employee ID"));
  }

  const ok = service.deleteEmployee(id);
  if (!ok) {
    return res.status(404).json(errorResponse("Employee not found"));
  }

  return res.status(200).json(successResponse({ deleted: true }, "Employee deleted successfully"));
};
