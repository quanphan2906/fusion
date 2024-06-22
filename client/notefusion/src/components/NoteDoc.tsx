"use client"
import TextareaAutoSize from "react-textarea-autosize";
import NoteBlock from "./NoteBlock";

export default function NoteDoc() {
    return (
        <main className="min-h-screen">
            <div className="flex flex-col px-24 py-10 w-full">
                <TextareaAutoSize
                    placeholder="Untitled"
                    className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                />
                <NoteBlock />
            </div>
        </main>
    );
}