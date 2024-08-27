import React, { createContext, useContext, useState } from 'react';

const DnDContext = createContext();

export const DnDProvider = ({ children }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (itemType) => {
    setDraggedItem(itemType);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (draggedItem) {
      setDroppedItems((prevItems) => [...prevItems, draggedItem]);
      setDraggedItem(null); 
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); 
  };

  return (
    <DnDContext.Provider value={{ draggedItem, droppedItems, handleDragStart, handleDrop, handleDragOver }}>
      {children}
    </DnDContext.Provider>
  );
};

export const useDnD = () => {
  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider');
  }
  return context;
};
