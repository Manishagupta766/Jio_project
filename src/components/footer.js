
import React, { useState } from 'react';
import ButtonComponent from './footerButton';
import WorkflowModal from './workflowModal';
import useWorkflowStore from './useStore';

const Footer = ({ selectedWorkflow }) => {
  const [modalTitle, setModalTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { nodes, edges } = useWorkflowStore(); 

  const handleClick = (title) => {
    setModalTitle(title);
    setShowModal(true);
  };

  const handleDeployWorkflow = () => {
    alert('Handle Deploy Workflow');
  };


  console.log(nodes +"Nodes");
  const handleSaveWorkflow = () => {
    console.log('Selected Workflow:', selectedWorkflow);

    if (!selectedWorkflow || selectedWorkflow.trim() === '') {
      alert('Please select a workflow first.');
      return;
    }
   

    const storedWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];
    let screenIdCounter = 1;

    const formattedNodes = nodes.map((node, index) => ({
      screenId: screenIdCounter.toString().padStart(2, '0'),
      screenName: node.data.screenName|| "Default Name",
      statusCode: `R00${screenIdCounter}`, 
      nextNode: edges.find(edge => edge.source === node.id)?.target || '',
      sequenceId: index + 1,
      deeplink: '',
    }));

    screenIdCounter += nodes.length;

    const workflowExists = storedWorkflows.some(workflow => workflow.workflowName === selectedWorkflow);

    if (workflowExists) {
      const updatedWorkflows = storedWorkflows.map(workflow => {
        if (workflow.workflowName === selectedWorkflow) {
          return {
            ...workflow,
            flow: [...workflow.flow, ...formattedNodes],
          };
        }
        return workflow;
      });

      localStorage.setItem('workflows', JSON.stringify(updatedWorkflows));
      console.log("Updated Workflows:", updatedWorkflows);
    } else {
      const newWorkflow = {
        workflowName: selectedWorkflow,
        flow: formattedNodes,
      };
      storedWorkflows.push(newWorkflow);
      localStorage.setItem('workflows', JSON.stringify(storedWorkflows));
      console.log("New Workflow Created:", newWorkflow);
    }

    alert('Workflow saved successfully!');
  };

  const handleClose = () => setShowModal(false);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <ButtonComponent text="Save Workflow" onClick={handleSaveWorkflow} />
      <ButtonComponent text="Deploy Workflow" onClick={handleDeployWorkflow} />
      <ButtonComponent text="Create New Workflow" onClick={() => handleClick('Create New Workflow')} />
      <WorkflowModal show={showModal} handleClose={handleClose} title={modalTitle} />
    </div>
  );
};

export default Footer;
