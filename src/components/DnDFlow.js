import React, { useRef, useCallback, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useDnD } from './DnDContext';

import Sidebar from './sidebar';
import UserNode from './UserNode'; 

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = ({ showModal, onWorkflowSelect, workflows }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [type] = useDnD();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

      if (!type) return;

      let newNode;
      if (type === 'input') {
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: 'Start Event' },
          sourcePosition: 'right',
        };
      } else if (type === 'output') {
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: 'End Event' },
          targetPosition: 'left',
        };
      } else {
        newNode = {
          id: getId(),
          type: 'userNode', 
          position,
          data: { label: 'User Node' },
          sourcePosition: 'right',
          targetPosition: 'left',
        };
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  const handleWorkflowSelect = (workflowName) => {
    setSelectedWorkflow(workflowName);
    if (typeof onWorkflowSelect === 'function') {
      onWorkflowSelect(workflowName);
    }
  };

  return (
    <div className="dndflow" style={{ width: "100%" }}>
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={{ userNode: UserNode }}
        >
          <Controls />
        </ReactFlow>
      </div>
      <Sidebar
        showModal={showModal}
        onWorkflowSelect={handleWorkflowSelect}
        workflows={workflows}
      />
    </div>
  );
};


export default () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);
