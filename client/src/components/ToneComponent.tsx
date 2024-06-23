import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ToneComponent: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<string | null>(null);

  const handleButtonClick = (tone: string) => {
    setSelectedTone(tone);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Tone</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {/* Content for Tone */}
          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Button
              variant={selectedTone === 'simple' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('simple')}
              sx={{ mx: 1 }}
            >
              Simple
            </Button>
            <Button
              variant={selectedTone === 'descriptive' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('descriptive')}
              sx={{ mx: 1 }}
            >
              Descriptive
            </Button>
            <Button
              variant={selectedTone === 'professional' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('professional')}
              sx={{ mx: 1 }}
            >
              Professional
            </Button>
            <Button
              variant={selectedTone === 'custom' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('custom')}
              sx={{ mx: 1 }}
            >
              Custom
            </Button>
          </Box>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ToneComponent;
