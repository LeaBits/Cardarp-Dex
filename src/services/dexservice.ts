import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc
} from "firebase/firestore";

import { db } from "./firebase";
import type { Dex } from "../models/Dex";
import type { FormGroup } from "../models/forms";

export async function createDex(uid: string, name: string): Promise<string> {
  const now = Date.now();

  const ref = await addDoc(collection(db, "users", uid, "dexes"), {
    name,
    enabledFormGroups: ["mega", "regional", "gigantamax", "battle", "other"],
    createdAt: now,
    updatedAt: now
  });

  return ref.id;
}

export async function loadDexes(uid: string): Promise<Dex[]> {
  const dexQuery = query(
    collection(db, "users", uid, "dexes"),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(dexQuery);

  return snapshot.docs.map(snapshotDoc => ({
    id: snapshotDoc.id,
    ...snapshotDoc.data()
  })) as Dex[];
}

export async function saveDexFilters(
  uid: string,
  dexId: string,
  enabledFormGroups: FormGroup[]
): Promise<void> {
  await updateDoc(doc(db, "users", uid, "dexes", dexId), {
    enabledFormGroups,
    updatedAt: Date.now()
  });
}