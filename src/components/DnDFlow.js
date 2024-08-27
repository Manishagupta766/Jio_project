import React from 'react';
import { useDnD } from './DnDContext';

const DnDFlow = () => {
  const { droppedItems, handleDrop, handleDragOver } = useDnD();

  return (
    <div
      style={{ flex: 1, border: '2px solid #ddd', padding: '20px' }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2>Drag and drop the task element here</h2>
      <div style={{ minHeight: '200px', border: '1px dashed #ddd', padding: '10px' }}>
        {droppedItems.length === 0 && (
          <p>Drop items here</p>
        )}
        {droppedItems.map((item, index) => (
          <div key={index} style={{ margin: '5px', padding: '10px', backgroundColor: '#e0e0e0' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DnDFlow;
