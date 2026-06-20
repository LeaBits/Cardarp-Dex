import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User
} from "firebase/auth";

import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export function login() {
  return signInWithPopup(auth, provider);
}

export function logout() {
  return signOut(auth);
}

export function observeAuth(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, callback);
}