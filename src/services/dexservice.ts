import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  setDoc
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

export async function renameDex(
  uid: string,
  dexId: string,
  name: string
): Promise<void> {
  await updateDoc(
    doc(db, "users", uid, "dexes", dexId),
    {
      name,
      updatedAt: Date.now()
    }
  );
}

export async function deleteDex(
  uid: string,
  dexId: string
): Promise<void> {
  await deleteDoc(
    doc(db, "users", uid, "dexes", dexId)
  );
}

import type { DexPokemon } from "../models/Dex";

export async function loadDexPokemon(
  uid: string,
  dexId: string
): Promise<DexPokemon[]> {
  const snapshot = await getDocs(
    collection(db, "users", uid, "dexes", dexId, "pokemon")
  );

  return snapshot.docs.map(doc => doc.data() as DexPokemon);
}

export async function saveDexPokemon(
  uid: string,
  dexId: string,
  pokemon: DexPokemon
): Promise<void> {
  await setDoc(
    doc(
      db,
      "users",
      uid,
      "dexes",
      dexId,
      "pokemon",
      pokemon.pokemonId.toString()
    ),
    pokemon
  );
}