import React, { useState } from "react";
import { Typography, Box, Card, CircularProgress } from "@mui/material";
import ToneComponent from "./ToneComponent";
import LearningMethodComponent from "./LearningMethodComponent";
import OrganizationComponent from "./OrganizationComponent";
import IntentComponent from "./IntentComponent";

interface PlaceHolderProps {
	suggestions: String[];
}

const Placeholder = ({ suggestions }: PlaceHolderProps) => {
	const [loading, setLoading] = useState(true);

	const handleCardClick = (index: number) => {
		// setQuotes((prevQuotes) => prevQuotes.filter((_, i) => i !== index));
	};

	return (
		<div className="flex flex-col h-full bg-gray-200">
			<h1 className="p-5 w-full flex justify-center text-center text-2xl">
				Suggestion
			</h1>
			<div className="w-full border-t border-gray-300">
				{loading ? (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						minHeight="50vh"
					>
						<CircularProgress />
					</Box>
				) : (
					suggestions.map((quote, index) => (
						<Card
							key={index}
							className="m-2 p-2"
							onClick={() => handleCardClick(index)}
							sx={{ cursor: "pointer" }}
						>
							<Typography variant="body1">{quote}</Typography>
						</Card>
					))
				)}
				{!loading && (
					<>
						<ToneComponent />
						<LearningMethodComponent />
						<OrganizationComponent />
						<IntentComponent />
					</>
				)}
			</div>
		</div>
	);
};

export default Placeholder;
