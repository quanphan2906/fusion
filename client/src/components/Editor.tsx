"use client";
import { Block, BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { FC } from "react";

interface EditorProps {
	onChange: (jsonBlocks: Block[]) => Promise<void>;
	editable?: boolean;
	editor: BlockNoteEditor;
}

const Editor: FC<EditorProps> = ({ onChange, editable, editor }) => {
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
