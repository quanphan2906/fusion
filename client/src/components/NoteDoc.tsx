"use client"
import TextareaAutoSize from "react-textarea-autosize";
import Editor from "./Editor";
import dynamic from 'next/dynamic';
import { useMemo } from "react";
import { Block } from "@blocknote/core";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function NoteDoc({ noteId }: { noteId: string }) {
    const Editor = useMemo(
        () => dynamic(() => import('./Editor'), {ssr: false}),
        []
    );

    const getNoteDocRef = (noteId: string) => doc(db, "notes", noteId);

    const handleChange = async (jsonBlocks: Block[]) => {
        try {
            console.log("setDocstart");
            await setDoc(getNoteDocRef(noteId), { content: jsonBlocks });
            console.log("setDocend");
        } catch (e) {
            console.error("Error saving document: ", e);
        }
    };

    const initialContent = '[{"type":"paragraph","children":[{"text":"Hello, world!"}]}]';

    return (
        <main className="min-h-screen">
            <div className="flex flex-col px-24 py-10 w-full">
                <TextareaAutoSize
                    placeholder="Untitled"
                    className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                />
            </div>
            <Editor
                onChange={handleChange}
                initialContent={initialContent}
                editable={true}
            />
        </main>
    );
}