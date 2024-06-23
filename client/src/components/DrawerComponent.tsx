import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon, Box, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

interface DrawerComponentProps {
  open: boolean;
  onClose: () => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        role="presentation"
        sx={{ width: '20vw', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <List>
          <Link href="/" passHref>
            <ListItemButton component="a">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </Link>
          <Link href="/search" passHref>
            <ListItemButton component="a">
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItemButton>
          </Link>
          <Link href="/info" passHref>
            <ListItemButton component="a">
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Info" />
            </ListItemButton>
          </Link>
        </List>
        <Box sx={{ flexGrow: 1 }} /> 
        <Box p={2}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CloseIcon />}
            onClick={onClose}
            fullWidth
          >
            Close
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
