"use client"
import TextareaAutoSize from "react-textarea-autosize";
import Editor from "./Editor";
import dynamic from 'next/dynamic';
import { useMemo } from "react";

export default function NoteDoc() {
    const Editor = useMemo(
        () => dynamic(() => import('./Editor'), {ssr: false}),
        []
    );

    const handleChange = () => {
        // osnChange logic
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