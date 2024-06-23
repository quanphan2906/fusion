import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon, Box, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { TabData } from './TabComponent';
import ArticleIcon from '@mui/icons-material/Article';
import Link from 'next/link';

interface DrawerComponentProps {
  open: boolean;
  onClose: () => void;
  notes: TabData[];
  onNoteClick: (index: number) => void;
  onDeleteNote: (id: string) => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ open, onClose, notes, onNoteClick, onDeleteNote }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        role="presentation"
        sx={{ width: '20vw', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <List>
        <Link href="/" passHref>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        <Link href="/" passHref>
          <ListItemButton>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItemButton>
        </Link>
        <Link href="/" passHref>
          <ListItemButton>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </ListItemButton>
        </Link>
        </List>
        <List>
          <div style={{ display: 'inline-flex'}}>
            <ListItemText primary="Your Notes" style={{ marginLeft: '10px' }} />
            <ArticleIcon style={{ marginTop: '3px', marginLeft: '5px', opacity: '0.6' }} />
          </div>
          {notes.map((note, index) => (
            <Box key={note.id} display="flex" alignItems="center">
              <ListItemButton onClick={() => onNoteClick(index)}>
                <ListItemText primary={note.title} />
              </ListItemButton>
              <IconButton onClick={() => onDeleteNote(note.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box p={2}>
          <Button
            variant="contained"
            color="secondary"
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
