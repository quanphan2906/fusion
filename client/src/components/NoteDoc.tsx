"use client"
import TextareaAutoSize from "react-textarea-autosize";
import Editor from "./Editor";

import dynamic from 'next/dynamic';

// Use dynamic import with `ssr: false`
const DynamicEditor = dynamic(() => import('./Editor'), {
    ssr: false,
});

export default function NoteDoc() {

    const handleChange = () => {
        // Your onChange logic
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
            <DynamicEditor
                onChange={handleChange}
                initialContent={initialContent}
                editable={true}
            />
        </main>
    );
}