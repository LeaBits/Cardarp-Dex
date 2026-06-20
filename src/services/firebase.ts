import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsu37c_j5U5AaZQ_OkCZPlTD57o3eDlqM",
  authDomain: "cardarp-dex.firebaseapp.com",
  projectId: "cardarp-dex",
  storageBucket: "cardarp-dex.firebasestorage.app",
  messagingSenderId: "679061236322",
  appId: "1:679061236322:web:24606de8ea57facd01bf3b",
  measurementId: "G-NL7Q1ZDDGT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);