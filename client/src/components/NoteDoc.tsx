"use client"
import TextareaAutoSize from "react-textarea-autosize";
import Editor from "./Editor";
import dynamic from 'next/dynamic';
import { useMemo, useState } from "react";
import { Block } from "@blocknote/core";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useRef } from "react";
import axios from "axios";

interface NoteDocProps {
    noteId: string;
    onTitleChange: (title: string) => void;
    initialTitle: string;
    initialContent: string;
}

export default function NoteDoc({ noteId, onTitleChange, initialTitle, initialContent }: NoteDocProps) {
    const [title, setTitle] = useState(initialTitle);
    const [lastChangeTime, setLastChangeTime] = useState(Date.now());
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const Editor = useMemo(
        () => dynamic(() => import('./Editor'), {ssr: false}),
        []
    );

    const handlePostRequest = async (title: string, jsonBlocks: Block[]) => {
        try {
            const response = await axios.post("http://localhost:5000/process_text", {
                title: title,
                texts: jsonBlocks
            });
            console.log(response.data);
        } catch (e) {
            console.error("Error sending POST request: ", e);
        }
    };

    const debounce = (func: Function, delay: number) => {
        return (...args: any[]) => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            debounceTimeout.current = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const debouncedPostRequest = useMemo(() => debounce(handlePostRequest, 3000), []);

    const getNoteDocRef = (noteId: string) => doc(db, "notes", noteId);

    const handleChange = async (jsonBlocks: Block[]) => {
        try {
            setLastChangeTime(Date.now());
            await setDoc(getNoteDocRef(noteId), { title, content: jsonBlocks });
        } catch (e) {
            console.error("Error saving document: ", e);
        }
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
        setLastChangeTime(Date.now());
        onTitleChange(newTitle);
    };

    return (
        <main className="min-h-screen">
            <div className="flex flex-col px-24 py-10 w-full">
                <TextareaAutoSize
                    placeholder="Untitled"
                    className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                    value={title}
                    onChange={handleTitleChange}
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
