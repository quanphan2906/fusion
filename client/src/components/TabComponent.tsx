import React, { useState, useEffect } from 'react';
import { Tabs, Tab, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import NoteDoc from './NoteDoc';
import TabPanel from './TabPanel';
import DrawerComponent from './DrawerComponent';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export interface TabData {
  id: string;
  title: string;
  content: string;
}

const TabsComponent: React.FC = () => {
  const [tabs, setTabs] = useState<TabData[]>([]);
  const [openTabs, setOpenTabs] = useState<number[]>([]);
  const [value, setValue] = useState(-1); // Start with no tab selected
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "notes"));
    const notes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title || 'Untitled',
      content: JSON.stringify(doc.data().content),
    }));
    setTabs(notes.length > 0 ? notes : [{ id: '', title: 'Untitled', content: '' }]);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    if (!openTabs.includes(newValue)) {
      setOpenTabs([...openTabs, newValue]);
    }
  };

  const handleAddTab = async () => {
    const newTabData = {
      title: `Untitled`,
      content: '',
    };
    const newDocRef = await addDoc(collection(db, "notes"), newTabData);
    await fetchNotes();
    setValue(tabs.length); // Set the value to the new tab's index
    setOpenTabs([...openTabs, tabs.length]); // Add the new tab to the openTabs array
  };

  const handleDeleteTab = async (tabId: string) => {
    await deleteDoc(doc(db, "notes", tabId));
    await fetchNotes();
    setValue(-1); // No tab selected after deletion
    setOpenTabs(openTabs.filter(index => tabs[index].id !== tabId));
  };

  const handleCloseTab = (index: number) => {
    setOpenTabs(openTabs.filter(openTab => openTab !== index));
    if (value === index) {
      setValue(openTabs.length > 1 ? openTabs[0] : -1);
    }
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleTitleChange = (index: number, title: string) => {
    const newTitle = title.trim() === "" ? "Untitled" : title;
    const newTabs = tabs.map((tab, tabIndex) =>
      tabIndex === index ? { ...tab, title: newTitle } : tab
    );
    setTabs(newTabs);
  };

  const handleContentChange = async (index: number, newContent: string) => {
    const newTabs = tabs.map((tab, tabIndex) =>
      tabIndex === index ? { ...tab, content: newContent } : tab
    );
    setTabs(newTabs);
  };

  const handleNoteClick = (index: number) => {
    if (!openTabs.includes(index)) {
      setOpenTabs([...openTabs, index]);
    }
    setValue(index);
    setDrawerOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <IconButton onClick={handleAddTab}>
          <AddIcon />
        </IconButton>
        <Tabs value={value} onChange={handleChange} aria-label="NoteDoc Tabs">
          {openTabs.map(index => (
            <Tab
              key={tabs[index].id}
              label={
                <div className="tab-with-close">
                  {tabs[index].title}
                  <IconButton
                    size="small"
                    className="close-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseTab(index);
                    }}
                    style={{ marginTop: '-3.5px' }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              }
            />
          ))}
        </Tabs>
      </Box>
      {value === -1 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h4" color="textSecondary" style={{ marginBottom: "150px" }}>
            Open or Create a Note +
          </Typography>
        </Box>
      ) : (
        tabs.map((tab, index) => (
          <TabPanel key={tab.id} value={value} index={index}>
            <NoteDoc
              noteId={tab.id}
              onTitleChange={(title) => handleTitleChange(index, title)}
              onContentChange={(content) => handleContentChange(index, content)}
              initialTitle={tab.title}
              initialContent={tab.content}
            />
          </TabPanel>
        ))
      )}
      <DrawerComponent
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        notes={tabs}
        onNoteClick={handleNoteClick}
        onDeleteNote={handleDeleteTab}
      />
    </div>
  );
}

export default TabsComponent;
