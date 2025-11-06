import { db } from "../../../config/firebaseConfig";

let lastNumericId = 0;

export const getAllEmployees = async () => {
  const snapshot = await db.collection("employees").get();
  return snapshot.docs.map((doc: any) => ({
    id: Number(doc.id) || 0,
    ...doc.data(),
  }));
};

export const getEmployeeById = async (id: number) => {
  const doc = await db.collection("employees").doc(String(id)).get();
  if (!doc.exists) return null;
  return { id, ...doc.data() };
};

export const createEmployee = async (data: any) => {
  const collectionRef = db.collection("employees");
  const snapshot = await collectionRef.get();

  if (!snapshot.empty) {
    const ids = snapshot.docs.map((d: any) => Number(d.id) || 0);
    lastNumericId = Math.max(...ids) + 1;
  } else {
    lastNumericId = 1;
  }

  const newId = lastNumericId;
  await collectionRef.doc(String(newId)).set(data);
  return { id: newId, ...data };
};

export const updateEmployee = async (id: string | number, updates: any) => {
  const ref = db.collection("employees").doc(String(id));
  const doc = await ref.get();

  if (!doc.exists) {
    const snapshot = await db.collection("employees").get();
    let foundId: string | null = null;

    snapshot.forEach((d) => {
      const data = d.data();
      if (Number(data.id) === Number(id)) foundId = d.id;
    });

    if (!foundId) return null;
    const foundRef = db.collection("employees").doc(foundId);
    const foundDoc = await foundRef.get();
    const currentData = foundDoc.data() || {};
    const newData = { ...currentData, ...updates };
    await foundRef.set(newData);
    return { id: foundId, ...newData };
  }

  const currentData = doc.data() || {};
  const newData = { ...currentData, ...updates };
  await ref.set(newData);
  return { id, ...newData };
};

export const deleteEmployee = async (id: number) => {
  const ref = db.collection("employees").doc(String(id));
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.delete();
  return true;
};
