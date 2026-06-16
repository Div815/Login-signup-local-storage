import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_wGyODjgMZEXVsej8MtlbeCryzcDkTmU",
  authDomain: "reactfb-102c3.firebaseapp.com",
  projectId: "reactfb-102c3",
  storageBucket: "reactfb-102c3.firebasestorage.app",
  messagingSenderId: "266819268540",
  appId: "1:266819268540:web:552fb2d314d108c71e45b9",
  measurementId: "G-NE66G0VK6Z"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore(app);
export const auth = getAuth(app);