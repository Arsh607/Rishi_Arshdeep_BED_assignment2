import { Request, Response, NextFunction } from "express";
import { successResponse } from "../models/response";
import * as service from "../services/employeeService";

export const getAll = (_req: Request, res: Response) =>
  res.status(200).json(successResponse(service.listEmployees()));

export const getById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ status: "error", message: "Invalid id" });
  const item = service.getEmployeeById(id);
  if (!item) return res.status(404).json({ status: "error", message: "Employee not found" });
  return res.status(200).json(successResponse(item));
};

export const create = (req: Request, res: Response, next: NextFunction) => {
  const { name, position, department, email, phone, branchId } = req.body || {};
  if (!name || !position || !department || !email || !phone || typeof branchId !== "number") {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }
  try {
    const created = service.createEmployee({ name, position, department, email, phone, branchId });
    return res.status(201).json(successResponse(created));
  } catch (e) { return next(e); }
};

export const update = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ status: "error", message: "Invalid id" });
  const updated = service.updateEmployee(id, req.body ?? {});
  if (!updated) return res.status(404).json({ status: "error", message: "Employee not found" });
  return res.status(200).json(successResponse(updated));
};

export const remove = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ status: "error", message: "Invalid id" });
  const ok = service.deleteEmployee(id);
  if (!ok) return res.status(404).json({ status: "error", message: "Employee not found" });
  return res.status(200).json(successResponse({ deleted: true }));
};