import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { FC } from "react";

interface EditorProps {
    onChange: (jsonBlocks: Block[]) => Promise<void>;
    initialContent?: string;
    editable?: boolean;
}

const defaultBlock: PartialBlock = {
    type: "paragraph",
    props: {
        backgroundColor: "default",
        textColor: "default",
        textAlignment: "left"
    },
    content: [{ type: "text", text: "Begin Here!", styles: {} }],
    children: []
};

const Editor: FC<EditorProps> = ({
    onChange,
    initialContent,
    editable,
}) => {
    const parsedInitialContent: PartialBlock[] = initialContent
        ? JSON.parse(initialContent)
        : [defaultBlock];

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: parsedInitialContent,
    });

    if (!editor) {
        return "Loading content...";
    }

    return (
        <div className="-mx-[-48px] my-4">
            <BlockNoteView
                editor={editor}
                editable={editable}
                theme="light"
                onChange={() => {
                    onChange(editor.document);
                }}
            />
        </div>
    );
};

export default Editor;
