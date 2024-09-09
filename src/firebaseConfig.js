// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_RQFco_T-iwQMm-5QrM7qX8rrQVsJVH0",
  authDomain: "todo-a2afc.firebaseapp.com",
  projectId: "todo-a2afc",
  storageBucket: "todo-a2afc.appspot.com",
  messagingSenderId: "827590424623",
  appId: "1:827590424623:web:eec6b0fa87ef2fcffa6eda",
  measurementId: "G-NXEZSDXPEE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
