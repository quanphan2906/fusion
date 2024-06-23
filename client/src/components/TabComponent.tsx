import React, { useState, useEffect } from 'react';
import { Tabs, Tab, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import NoteDoc from './NoteDoc';
import TabPanel from './TabPanel';
import DrawerComponent from './DrawerComponent';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const TabsComponent: React.FC = () => {
  const [tabs, setTabs] = useState<{ id: string, title: string, content: string }[]>([]);
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'Untitled',
        content: JSON.stringify(doc.data().content),
      }));
      setTabs(notes);
      setLoading(false);
    };

    fetchNotes();
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleAddTab = async () => {
    const newTabData = {
      title: `Untitled`,
      content: '',
    };
    const newDocRef = await addDoc(collection(db, "notes"), newTabData);
    const newTab = { id: newDocRef.id, ...newTabData };
    setTabs([...tabs, newTab]);
    setValue(tabs.length);
  };

  const handleDeleteTab = (tabIndex: number) => {
    const newTabs = tabs.filter((tab, index) => index !== tabIndex);
    setTabs(newTabs);
    setValue(tabIndex > 0 ? tabIndex - 1 : 0);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Tabs value={value} onChange={handleChange} aria-label="NoteDoc Tabs">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              label={
                <div className="flex items-center">
                  {tab.title}
                  {tabs.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTab(index);
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>
              }
            />
          ))}
          <IconButton onClick={handleAddTab}>
            <AddIcon />
          </IconButton>
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={tab.id} value={value} index={index}>
          <NoteDoc
            noteId={tab.id}
            onTitleChange={(title) => handleTitleChange(index, title)}
            initialTitle={tab.title}
            initialContent={tab.content}
          />
        </TabPanel>
      ))}
      <DrawerComponent open={drawerOpen} onClose={() => toggleDrawer(false)} />
    </div>
  );
}

export default TabsComponent;
