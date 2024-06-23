"use client";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { FC, useEffect } from "react";

interface EditorProps {
	onChange: (jsonBlocks: Block[]) => Promise<void>;
	initialContent?: string;
	editable?: boolean;
	editor: BlockNoteEditor;
}

const defaultBlock: PartialBlock = {
	type: "paragraph",
	props: {
		backgroundColor: "default",
		textColor: "default",
		textAlignment: "left",
	},
	content: [{ type: "text", text: "", styles: {} }],
	children: [],
};

const Editor: FC<EditorProps> = ({
	onChange,
	initialContent,
	editable,
	editor,
}) => {
	let content: PartialBlock[];

	try {
		content = initialContent
			? (JSON.parse(initialContent) as PartialBlock[])
			: [defaultBlock];
		if (!Array.isArray(content) || content.length === 0) {
			throw new Error(
				"initialContent must be a non-empty array of blocks"
			);
		}
	} catch (error) {
		console.error("Error parsing initial content:", error);
		content = [defaultBlock];
	}

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
