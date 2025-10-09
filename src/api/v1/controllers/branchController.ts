import { Request, Response, NextFunction } from "express";
import * as service from "../services/branchService";
import { successResponse } from "../models/response";

export const getAll = async (_req: Request, res: Response) => {
  const list = await service.listBranches();
  res.status(200).json(successResponse(list));
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ status: "error", message: "Invalid id" });
  const branch = await service.getBranchById(id);
  if (!branch) return res.status(404).json({ status: "error", message: "Not found" });
  res.status(200).json(successResponse(branch));
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone)
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  try {
    const created = await service.createBranch({ name, address, phone });
    res.status(201).json(successResponse(created));
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid id" });
  }

  try {
    const updated = await service.updateBranch(id, req.body ?? {});
    if (!updated) {
      return res.status(404).json({ status: "error", message: "Branch not found" });
    }
    return res.status(200).json(successResponse(updated));
  } catch (err) {
    return res.status(500).json({ status: "error", message: "Update failed" });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ status: "error", message: "Invalid id" });
  const ok = await service.deleteBranch(id);
  if (!ok) return res.status(404).json({ status: "error", message: "Not found" });
  res.status(200).json(successResponse({ deleted: true }));
};
