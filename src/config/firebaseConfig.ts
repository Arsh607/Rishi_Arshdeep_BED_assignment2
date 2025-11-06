import dotenv from "dotenv";
dotenv.config();
import { initializeApp, cert, getApps, App, AppOptions } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const getFirebaseConfig = (): AppOptions => {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error("Missing Firebase configuration.");
  }

  const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

  return {
    credential: cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  };
};

const firebaseApp: App = getApps().length === 0 ? initializeApp(getFirebaseConfig()) : getApps()[0];

export const db = getFirestore(firebaseApp);
