import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface TextComponentProps {
  quotes: string[];
  highlight?: string; // Optional prop to highlight certain parts of the sentence
}

const TextComponent: React.FC<TextComponentProps> = ({ quotes, highlight }) => {
  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight) return text;

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-full space-y-4">
      {quotes.map((quote, index) => (
        <Card key={index} sx={{ borderRadius: '16px' }}>
          <CardContent>
            <Typography variant="h6" component="p">
              {getHighlightedText(quote, highlight || '')}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TextComponent;
