import { Request, Response } from "express";
import { successResponse } from "../models/response";
import * as service from "../services/branchService";

export const getAll = (_req: Request, res: Response) => {
  return res.status(200).json(successResponse(service.listBranches()));
};

export const getById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid id" });
  }
  const branch = service.getBranchById(id);
  if (!branch) {
    return res.status(404).json({ status: "error", message: "Branch not found" });
  }
  return res.status(200).json(successResponse(branch));
};

export const create = (req: Request, res: Response) => {
  const { name, address, phone } = req.body || {};
  if (!name || !address || !phone) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }
  const created = service.createBranch({ name, address, phone });
  return res.status(201).json(successResponse(created));
};

export const update = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid id" });
  }
  const updated = service.updateBranch(id, req.body ?? {});
  if (!updated) {
    return res.status(404).json({ status: "error", message: "Branch not found" });
  }
  return res.status(200).json(successResponse(updated));
};

export const remove = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid id" });
  }
  const ok = service.deleteBranch(id);
  if (!ok) {
    return res.status(404).json({ status: "error", message: "Branch not found" });
  }
  return res.status(200).json(successResponse({ deleted: true }));
};
