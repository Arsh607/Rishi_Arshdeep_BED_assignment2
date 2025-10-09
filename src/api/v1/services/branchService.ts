import { db } from "../../../config/firebaseConfig";
import { Branch } from "../models/branch";

export const listBranches = async (): Promise<Branch[]> => {
  const collection = db.collection("branches");
  const snapshot = await collection.get();
  return snapshot.docs.map(
    (doc) => ({ id: Number(doc.id), ...doc.data() } as Branch)
  );
};

export const getBranchById = async (id: number): Promise<Branch | undefined> => {
  const collection = db.collection("branches");
  const ref = collection.doc(String(id));
  const doc = await ref.get();
  if (!doc.exists) return undefined;
  return { id, ...doc.data() } as Branch;
};

export const createBranch = async (
  payload: Omit<Branch, "id">
): Promise<Branch> => {
  const collection = db.collection("branches");
  const docRef = await collection.add(payload);
  return { id: Number(docRef.id), ...payload };
};

export const updateBranch = async (id: number, payload: Partial<Branch>): Promise<Branch | null> => {
  const idStr = String(id);
  const ref = db.collection("branches").doc(idStr);
  const doc = await ref.get();
  if (!doc.exists) return null;
  await ref.update(payload);
  const updated = { id, ...doc.data(), ...payload };
  return updated as Branch;
};

export const deleteBranch = async (id: number): Promise<boolean> => {
  const ref = db.collection("branches").doc(String(id));
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.delete();
  return true;


};
