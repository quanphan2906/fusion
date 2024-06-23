"use client";
import TextareaAutoSize from "react-textarea-autosize";
import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect } from "react";
import { Block } from "@blocknote/core";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import axios from "axios";
import { useDebounce } from "@uidotdev/usehooks";

interface NoteDocProps {
    noteId: string;
    onTitleChange: (title: string) => void;
    onContentChange: (content: string) => void;
    initialTitle: string;
    initialContent: string;
}

export default function NoteDoc({ noteId, onTitleChange, onContentChange, initialTitle, initialContent }: NoteDocProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState<Block[]>([]);
    const debouncedTitle = useDebounce(title, 3000);
    const debouncedContent = useDebounce(content, 3000);
    const [hasContent, setHasContent] = useState(!!initialContent);

    const Editor = useMemo(
        () => dynamic(() => import('./Editor'), { ssr: false }),
        []
    );

    const extractTextFromBlocks = (blocks: Block[]): string[] => {
        const texts: string[] = [];
        
        const traverseBlocks = (block: Block) => {
            if (block.content && Array.isArray(block.content)) {
                texts.push(...block.content.map((item) => {
                    if ((item as any).type === 'text') {
                        return (item as any).text;
                    } else if ((item as any).type === 'link') {
                        return (item as any).content.map((subItem: any) => subItem.text).join(' ');
                    }
                    return '';
                }).join(' '));
            }
            if (block.content && (block.content as any).type === 'tableContent') {
                (block.content as any).rows.forEach((row: any) => {
                    row.cells.forEach((cell: any) => {
                        texts.push(cell.map((item: any) => item.text).join(' '));
                    });
                });
            }
            if (block.children) {
                block.children.forEach(traverseBlocks);
            }
        };

        blocks.forEach(traverseBlocks);
        return texts;
    };

    const handlePostRequest = async (oldTitle: string, newTitle?: string, newBlocks?: Block[]) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/upsert-doc", {
                old_title: oldTitle,
                new_title: newTitle,
                new_blocks: newBlocks
            });
            console.log(response.data);
        } catch (e) {
            console.error("Error sending POST request: ", e);
        }
    };

    useEffect(() => {
        if (hasContent) {
            if (debouncedTitle !== initialTitle) {
                handlePostRequest(initialTitle, debouncedTitle, debouncedContent.length ? debouncedContent : undefined);
            } else if (debouncedContent.length > 0) {
                handlePostRequest(initialTitle, undefined, debouncedContent);
            }
        }
    }, [debouncedContent, debouncedTitle]);

    const getNoteDocRef = (noteId: string) => doc(db, "notes", noteId);

    const handleChange = async (jsonBlocks: Block[]) => {
        try {
            setContent(jsonBlocks);
            setHasContent(jsonBlocks.length > 0);
            await setDoc(getNoteDocRef(noteId), { title, content: jsonBlocks });
            onContentChange(JSON.stringify(jsonBlocks)); // Notify TabsComponent about the change
        } catch (e) {
            console.error("Error saving document: ", e);
        }
    };

    const handleTitleChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
        onTitleChange(newTitle);
        try {
            await setDoc(getNoteDocRef(noteId), { title: newTitle, content });
        } catch (e) {
            console.error("Error saving title: ", e);
        }
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