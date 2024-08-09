import React, { useState } from 'react';
import ButtonComponent from './footerButton';
import WorkflowModal from './workflowModal';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  
  const handleClick = (buttonName) => {
    setModalTitle(buttonName);
    setShowModal(true);
  };
  const handleDeployWorkflow = (buttonName) => {
    alert("handle Deploy Workflow")
  };

  const handleSaveWorkflow = (buttonName) => {
    alert("Save Workflow")
  };

  const handleClose = () => setShowModal(false);

  return (
    <div style={{ textAlign: 'center', padding: '20px'  }}>
      <ButtonComponent text="Save Workflow" onClick={() => handleSaveWorkflow('Save Workflow')} />
      <ButtonComponent text="Deploy Workflow" onClick={() => handleDeployWorkflow('Deploy Workflow')} />
      <ButtonComponent text="Create New Workflow" onClick={() => handleClick('Create New Workflow')} />
      <WorkflowModal show={showModal} handleClose={handleClose} title={modalTitle} />
    </div>
  );
};

export default Footer;
