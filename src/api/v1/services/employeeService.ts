import { db } from "../../../config/firebaseConfig";
import { Employee } from "../models/employee";

const collection = db.collection("employees");

export const listEmployees = async (): Promise<Employee[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map(
    (doc) => ({ id: Number(doc.id), ...doc.data() } as Employee)
  );
};

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
  const doc = await collection.doc(String(id)).get();
  if (!doc.exists) return null;
  return { id, ...doc.data() } as Employee;
};

export const createEmployee = async (
  payload: Omit<Employee, "id">
): Promise<Employee> => {
  const docRef = await collection.add(payload);
  return { id: Number(docRef.id), ...payload };
};

export const updateEmployee = async (
  id: number,
  patch: Partial<Omit<Employee, "id">>
): Promise<Employee | null> => {
  const ref = collection.doc(String(id));
  const doc = await ref.get();
  if (!doc.exists) return null;

  await ref.update(patch);
  const updatedDoc = await ref.get();
  return { id, ...updatedDoc.data() } as Employee;
};

export const deleteEmployee = async (id: number): Promise<boolean> => {
  const ref = collection.doc(String(id));
  const doc = await ref.get();
  if (!doc.exists) return false;

  await ref.delete();
  return true;
};
