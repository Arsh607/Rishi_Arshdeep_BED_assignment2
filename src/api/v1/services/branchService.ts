import { branches } from "../../../data/branches";
import { Branch } from "../models/branch";

let lastBranchId = branches.reduce((m, b) => Math.max(m, b.id), 0);

export const listBranches = (): Branch[] => branches;
export const getBranchById = (id: number): Branch | undefined => branches.find(b => b.id === id);

export const createBranch = (payload: Omit<Branch, "id">): Branch => {
  lastBranchId += 1;
  const out: Branch = { id: lastBranchId, ...payload };
  branches.push(out);
  return out;
};

export const updateBranch = (id: number, patch: Partial<Omit<Branch, "id">>): Branch | undefined => {
  const b = branches.find(x => x.id === id);
  if (!b) return undefined;
  Object.assign(b, patch);
  return b;
};

export const deleteBranch = (id: number): boolean => {
  const i = branches.findIndex(x => x.id === id);
  if (i === -1) return false;
  branches.splice(i, 1);
  return true;
};
