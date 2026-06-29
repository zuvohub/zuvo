import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAnO-Dt4pA63Og5cVuHZQzXRrUsyARDdo",
  authDomain: "zuvo-6df01.firebaseapp.com",
  projectId: "zuvo-6df01",
  storageBucket: "zuvo-6df01.firebasestorage.app",
  messagingSenderId: "845186081656",
  appId: "1:845186081656:web:31638a2e6ea73ffe565e8d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;