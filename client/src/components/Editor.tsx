import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { FC } from "react";

interface EditorProps {
    onChange?: () => void;
    initialContent?: string;
    editable?: boolean;
}

const Editor: FC<EditorProps> = ({
    onChange,
    initialContent,
    editable,
}) => {
    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent 
        ? (JSON.parse(initialContent) as PartialBlock[]) 
        : undefined,
    });

    return (
        <div className="-mx-[-48px] my-4">
            <BlockNoteView
            editor={editor}
            editable={editable}
            theme='light'
            onChange={onChange}
        />
        </div>
    );
};

export default Editor;
