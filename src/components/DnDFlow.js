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
import WorkflowModal from './workflowModal';
import UserNode from './UserNode'; 

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = ({ showModal, workflows }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [edgeData, setEdgeData] = useState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [type] = useDnD();

  const saveWorkflow = () => {
    if (!selectedWorkflow) {
      <p>select workflow</p>
      return;
    }
  const storedWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];
  
  const formattedEdges = edges.map(edge => ({
    source: edge.source,
    target: edge.target,
    id: edge.id
  }));

  const formattedNodes = nodes.map(node => ({
    id: node.id,
    name: node.data.label 
  }));

  const updatedWorkflows = storedWorkflows.map((workflow) => {
    if (workflow.workflowName === selectedWorkflow) {
      return {
        ...workflow,
        flow: [
          ...formattedNodes,
          ...formattedEdges
        ],
      };
    }
    return workflow;
  });


    localStorage.setItem('workflows', JSON.stringify(updatedWorkflows));
    alert('Workflow saved successfully!');
  };

  const onConnect = useCallback(
    (params) => {
      const newEdge = addEdge(params, edges);
      setEdges(newEdge);
      setEdgeData((prevEdgeData) => [
        ...prevEdgeData,
        { id: params.id, source: params.source, target: params.target },
      ]);
    },
    [setEdges, edges]
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
    const storedWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];
    const selectedWorkflowData = storedWorkflows.find(
      (workflow) => workflow.workflowName === workflowName
    );

    if (selectedWorkflowData) {
      const { nodes: storedNodes = [], edges: storedEdges = [] } = selectedWorkflowData.flow || {};
      setNodes(storedNodes);
      setEdges(storedEdges);
      setEdgeData(storedEdges);
    } else {
      console.error('Selected workflow not found or has invalid format');
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleWorkflowCreate = (workflowName) => {
    setSelectedWorkflow(workflowName);
  };

  return (
    <div className="dndflow" style={{ width: '100%' }}>
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
        onCreateWorkflow={openModal}
      />

      <button onClick={saveWorkflow} className="save-workflow-btn">
        Save Workflow
      </button>

      <WorkflowModal
        show={isModalOpen}
        handleClose={closeModal}
        title="Create Workflow"
        onCreate={handleWorkflowCreate}
      />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);
