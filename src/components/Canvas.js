import React, { useState, useCallback } from 'react';
import 'reactflow/dist/style.css'; // Remove if causing issues
import ReactFlow, { MiniMap, Controls, Background, addEdge, useNodesState, useEdgesState } from 'reactflow';
import CanvasSide from './CanvasSide';

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Start Node' }, position: { x: 250, y: 5 } },
];

const initialEdges = [];

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(2);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = useCallback((type, label) => {
    const newNode = {
      id: nodeId.toString(),
      type,
      data: { label },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId((prevId) => prevId + 1);
  }, [nodeId, setNodes]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <CanvasSide addNode={addNode} />
      <div style={{ flexGrow: 1, height: '100%', width: '100%' }}>
        <div style={{ height: '100%', width: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            style={{ height: '100%', width: '100%' }}
          >
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
