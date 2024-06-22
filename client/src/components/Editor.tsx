import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { FC } from "react";
import { uploadFiles } from "../../utils/uploadthing";

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
        uploadFile: async (file: File) => {
            const [res] = await uploadFiles('imageUploader', {files: [file]})
            return res.url;
        }
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
