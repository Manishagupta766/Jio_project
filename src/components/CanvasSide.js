import React, { useState } from 'react';

const nodeTypes = ['input', 'default', 'output', 'button'];

const CanvasSide = ({ addNode }) => {
  const [nodeType, setNodeType] = useState(nodeTypes[0]);
  const [nodeLabel, setNodeLabel] = useState('New Node');

  const handleAddNode = () => {
    addNode(nodeType, nodeLabel);
  };

  return (
    <div style={{ width: 200, padding: 20, borderRight: '1px solid #ddd' }}>
      <h4>Add Node</h4>
      <div style={{ marginBottom: 10 }}>
        <label>Type:</label>
        <select value={nodeType} onChange={(e) => setNodeType(e.target.value)}>
          {nodeTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Label:</label>
        <input
          type="text"
          value={nodeLabel}
          onChange={(e) => setNodeLabel(e.target.value)}
        />
      </div>
      <button onClick={handleAddNode}>Add Node</button>
    </div>
  );
};

export default CanvasSide;
