/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import TextareaAutoSize from "react-textarea-autosize";
import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect, useRef } from "react";
import { Block } from "@blocknote/core";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import axios from "axios";
import { useDebounce } from "@uidotdev/usehooks";

interface NoteDocProps {
    noteId: string;
    onTitleChange: (title: string) => void;
    initialTitle: string;
    initialContent: string;
}

export default function NoteDoc({ noteId, onTitleChange, initialTitle, initialContent }: NoteDocProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState<Block[]>([]);
    const debouncedTitle = useDebounce(title, 3000);
    const debouncedContent = useDebounce(content, 3000);

    const Editor = useMemo(
        () => dynamic(() => import('./Editor'), { ssr: false }),
        []
    );

    const handlePostRequest = async (title: string, jsonBlocks: Block[]) => {
        const texts = extractTextFromBlocks(jsonBlocks);
        try {
            const response = await axios.post("http://127.0.0.1:5000/process_text", {
                title: title,
                texts: texts
            });
            console.log(response.data);
        } catch (e) {
            console.error("Error sending POST request: ", e);
        }
    };

    const extractTextFromBlocks = (blocks: Block[]): string[] => {
        const texts: string[] = [];

        blocks.forEach(block => {
            if (block.type === 'paragraph' || block.type === 'heading') {
                if (block.content) {
                    const textContent = block.content.map(item => {
                        if (item.type === 'text') {
                            return item.text;
                        }
                        return '';
                    }).join(' ');
                    texts.push(textContent);
                }
            }
        });

        return texts;
    };

    useEffect(() => {
        if (debouncedContent.length > 0 || debouncedTitle) {
            handlePostRequest(debouncedTitle, debouncedContent);
        }
    }, [debouncedContent, debouncedTitle]);

    const getNoteDocRef = (noteId: string) => doc(db, "notes", noteId);

    const handleChange = async (jsonBlocks: Block[]) => {
        try {
            setContent(jsonBlocks);
            await setDoc(getNoteDocRef(noteId), { title, content: jsonBlocks });
        } catch (e) {
            console.error("Error saving document: ", e);
        }
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
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
