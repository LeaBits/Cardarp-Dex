import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  await signInWithPopup(auth, provider);
}