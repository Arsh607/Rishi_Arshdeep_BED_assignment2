import { db } from "../../../config/firebaseConfig";
import { Branch } from "../models/branch";

const collection = db.collection("branches");

export const listBranches = async (): Promise<Branch[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map(
    (doc) => ({ id: Number(doc.id), ...doc.data() } as Branch)
  );
};

export const getBranchById = async (id: number): Promise<Branch | null> => {
  const doc = await collection.doc(String(id)).get();
  if (!doc.exists) return null;
  return { id, ...doc.data() } as Branch;
};

export const createBranch = async (
  payload: Omit<Branch, "id">
): Promise<Branch> => {
  const docRef = await collection.add(payload);
  return { id: Number(docRef.id), ...payload };
};

export const updateBranch = async (
  id: number,
  patch: Partial<Omit<Branch, "id">>
): Promise<Branch | null> => {
  const ref = collection.doc(String(id));
  const doc = await ref.get();
  if (!doc.exists) return null;

  await ref.update(patch);
  const updatedDoc = await ref.get();
  return { id, ...updatedDoc.data() } as Branch;
};

export const deleteBranch = async (id: number): Promise<boolean> => {
  const ref = collection.doc(String(id));
  const doc = await ref.get();
  if (!doc.exists) return false;

  await ref.delete();
  return true;
};
