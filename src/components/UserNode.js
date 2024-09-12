import React, { useCallback, useState } from 'react'; 
import { Handle, Position } from '@xyflow/react';

const handleStyle = { background: '#555' }; 

const UserNode = ({ data, isConnectable, onUpdateNode }) => {
  const [nodeName, setNodeName] = useState(data.screenName || ''); 

  const onChange = useCallback((evt) => {
    const newValue = evt.target.value;
    setNodeName(newValue);
    if (onUpdateNode) { 
      onUpdateNode({ id: data.id, screenName: newValue }); 
    }
  }, [data.id, onUpdateNode]);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">Node name:</label>
        <input
          id="text"
          name="text"
          value={nodeName}
          onChange={onChange}
          className="nodrag"
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default UserNode;
