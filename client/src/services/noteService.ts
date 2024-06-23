import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Block } from "@blocknote/core";

const getNoteDocRef = (noteId: string) => doc(db, "notes", noteId); // Replace "noteId" with a dynamic ID if needed

export const saveToStorage = async (noteId: string, jsonBlocks: Block[]) => {
    try {
        await setDoc(getNoteDocRef(noteId), { content: jsonBlocks });
    } catch (e) {
        console.error("Error saving document: ", e);
    }
};

export const loadFromStorage = async (noteId: string): Promise<Block[] | undefined> => {
    try {
        const docSnap = await getDoc(getNoteDocRef(noteId));
        if (docSnap.exists()) {
            return docSnap.data().content;
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error loading document: ", e);
    }
    return undefined;
};
