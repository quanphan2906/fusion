import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Typography } from '@mui/material';
import QuotesComponent from '@/components/TextComponent';
import { fetchText } from '@/api/uploadthing/dummytxt';

const Placeholder: React.FC = () => {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlight, setHighlight] = useState('');

  useEffect(() => {
    fetchText().then((data) => {
      setQuotes(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-200">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setHighlight(e.target.value)}
        />
      </div>
      <div className="flex-1 flex items-center justify-center overflow-auto p-4">
        {loading ? (
          <Typography variant="h6">Loading quotes...</Typography>
        ) : (
          <QuotesComponent quotes={quotes} highlight={highlight} />
        )}
      </div>
      <div className="w-full border-t border-gray-300">
        <Tabs
          value={0} 
          aria-label="Placeholder Tabs"
          variant="fullWidth"
          centered
        >
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </div>
    </div>
  );
};

export default Placeholder;
