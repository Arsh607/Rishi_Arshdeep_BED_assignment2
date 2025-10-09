import { Request, Response } from "express";
import { successResponse, errorResponse } from "../models/response";
import * as service from "../services/branchService";

export const getAll = (_req: Request, res: Response) => {
  const branches = service.listBranches();
  return res.status(200).json(successResponse(branches, "All branches fetched successfully"));
};

export const getById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json(errorResponse("Invalid branch ID"));
  }

  const branch = service.getBranchById(id);
  if (!branch) {
    return res.status(404).json(errorResponse("Branch not found"));
  }

  return res.status(200).json(successResponse(branch, "Branch details fetched successfully"));
};

export const create = (req: Request, res: Response) => {
  const { name, address, phone } = req.body || {};
  if (!name || !address || !phone) {
    return res.status(400).json(errorResponse("Missing required fields"));
  }

  const created = service.createBranch({ name, address, phone });
  return res.status(201).json(successResponse(created, "Branch created successfully"));
};

export const update = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json(errorResponse("Invalid branch ID"));
  }

  const updated = service.updateBranch(id, req.body ?? {});
  if (!updated) {
    return res.status(404).json(errorResponse("Branch not found"));
  }

  return res.status(200).json(successResponse(updated, "Branch updated successfully"));
};

export const remove = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json(errorResponse("Invalid branch ID"));
  }

  const ok = service.deleteBranch(id);
  if (!ok) {
    return res.status(404).json(errorResponse("Branch not found"));
  }

  return res.status(200).json(successResponse({ deleted: true }, "Branch deleted successfully"));
};
