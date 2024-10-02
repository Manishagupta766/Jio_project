import React, { useRef, useCallback, useEffect } from 'react';
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
import Sidebar from './sidebar'; 
import { DnDProvider, useDnD } from './DnDContext';
import UserNode from './UserNode';
import useFlowStore from './useStore';

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = ({ showModal, selectedWorkflow , setWorkflowName }) => { 
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const { setNewNodes, setNewEdges } = useFlowStore();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onUpdateNode = useCallback(
    (updatedNode) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === updatedNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                screenName: updatedNode.screenName,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  useEffect(() => {
    setNewNodes(nodes);
  }, [nodes]);

  useEffect(() => {
    setNewEdges(edges);
  }, [edges]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let newNode;

      if (type === 'input') {
        newNode = {
          id: getId(),
          type: 'input',
          position,
          data: { label: 'Start Event' },
        };
      } else if (type === 'output') {
        newNode = {
          id: getId(),
          type: 'output',
          position,
          data: { label: 'End Event' },
        };
      } else {
        newNode = {
          id: getId(),
          type: 'userNode',
          position,
          data: { label: 'User Node', screenName: '', onUpdateNode },
        };
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, onUpdateNode]
  );

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={{ userNode: UserNode }}
          fitView
        >
          <Controls />
        </ReactFlow>
      </div>
      <Sidebar 
        showModal={showModal} 
        setWorkflowName={setWorkflowName}
        selectedWorkflow={selectedWorkflow} 
      />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
