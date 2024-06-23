import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const IntentComponent: React.FC = () => {
  const [intent, setIntent] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntent(event.target.value);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
        <Typography>Intent</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <TextField
            label="Type your intent"
            value={intent}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default IntentComponent;
