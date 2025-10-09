import { db } from "../../../config/firebaseConfig";
import { Employee } from "../models/employee";

export const listEmployees = async (): Promise<Employee[]> => {
  const collection = db.collection("employees");
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => ({ id: parseInt(doc.id, 10) || 1, ...doc.data() })) as Employee[];
};

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
  const ref = db.collection("employees").doc(String(id));
  const doc = await ref.get();
  return doc.exists ? ({ id: parseInt(doc.id, 10) || 1, ...doc.data() } as Employee) : null;
};

export const createEmployee = async (payload: Employee): Promise<Employee> => {
  const collection = db.collection("employees");
  const docRef = await collection.add(payload);
  const numericId = parseInt(docRef.id, 10) || 1;
  return { id: numericId, ...payload } as Employee;
};

export const updateEmployee = async (id: number, payload: Partial<Employee>): Promise<Employee | null> => {
  const idStr = String(id);
  const ref = db.collection("employees").doc(idStr);
  const doc = await ref.get();
  if (!doc.exists) return null;
  await ref.update(payload);
  const updated = { id, ...doc.data(), ...payload };
  return updated as Employee;
};

export const deleteEmployee = async (id: number): Promise<boolean> => {
  const ref = db.collection("employees").doc(String(id));
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.delete();
  return true;
};




