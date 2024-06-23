import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const OrganizationComponent: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleButtonClick = (type: string) => {
    setSelectedTypes((prevSelectedTypes) => 
      prevSelectedTypes.includes(type) 
        ? prevSelectedTypes.filter(t => t !== type) 
        : [...prevSelectedTypes, type]
    );
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
        <Typography>Organization</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {/* Display options buttons */}
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} mb={2}>
            <Button
              variant={selectedTypes.includes('sections') ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('sections')}
              sx={{ mx: 1 }}
            >
              Sections
            </Button>
            <Button
              variant={selectedTypes.includes('step-by-step') ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('step-by-step')}
              sx={{ mx: 1 }}
            >
              Step-by-Step
            </Button>
            <Button
              variant={selectedTypes.includes('bullet-points') ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('bullet-points')}
              sx={{ mx: 1 }}
            >
              Bullet Points
            </Button>
            <Button
              variant={selectedTypes.includes('color-coded') ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('color-coded')}
              sx={{ mx: 1 }}
            >
              Color Coded
            </Button>
          </Box>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrganizationComponent;
