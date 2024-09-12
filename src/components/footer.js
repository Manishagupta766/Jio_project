import React, { useState } from 'react';
import ButtonComponent from './footerButton';
import WorkflowModal from './workflowModal';

const Footer = ({ nodes, edges, selectedWorkflow, saveWorkflow }) => {
  const [modalTitle, setModalTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleClick = (buttonName) => {
    setModalTitle(buttonName);
    setShowModal(true);
  };

  const handleDeployWorkflow = () => {
    alert("Handle Deploy Workflow");
  };

  const handleSaveWorkflow = () => {
    if (!selectedWorkflow) {
      alert('Select a workflow first');
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

    const updatedWorkflows = storedWorkflows.map(workflow => {
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

  const handleClose = () => setShowModal(false);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <ButtonComponent text="Save Workflow" onClick={handleSaveWorkflow} />
      <ButtonComponent text="Deploy Workflow" onClick={handleDeployWorkflow} />
      <ButtonComponent text="Create New Workflow" onClick={() => handleClick('Create New Workflow')} />
      <WorkflowModal
        show={showModal}
        handleClose={handleClose}
        title={modalTitle}
        onCreate={(workflowName) => setSelectedWorkflow(workflowName)}
      />
    </div>
  );
};

export default Footer;
