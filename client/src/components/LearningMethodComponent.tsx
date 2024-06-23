import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LearningMethodComponent: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleButtonClick = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
        <Typography>Learning Method</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {/* Content for Learning Method */}
          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Button
              variant={selectedMethod === 'visual' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('visual')}
              sx={{ mx: 1 }}
            >
              Visual
            </Button>
            <Button
              variant={selectedMethod === 'auditory' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('auditory')}
              sx={{ mx: 1 }}
            >
              Auditory
            </Button>
            <Button
              variant={selectedMethod === 'action' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('action')}
              sx={{ mx: 1 }}
            >
              Action
            </Button>
          </Box>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default LearningMethodComponent;
