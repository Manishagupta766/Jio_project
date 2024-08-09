// src/WorkflowModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const WorkflowModal = ({ show, handleClose, title }) => {
  const [workflowName, setWorkflowName] = useState('');
  const [workflowType, setWorkflowType] = useState('');
  const [workflowSubtype, setWorkflowSubtype] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCreate = () => {
    if (workflowName && workflowType && workflowSubtype) {
      // Redirect to the canvas page if all fields are filled
      navigate('/canvas'); // Update this path as needed
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formWorkflowName">
            <Form.Label>Enter Workflow Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter workflow name" 
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDropdown1">
            <Form.Label>Enter Workflow Type</Form.Label>
            <Form.Control 
              as="select" 
              value={workflowType}
              onChange={(e) => setWorkflowType(e.target.value)}
            >
              <option value="">Select type</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDropdown2">
            <Form.Label>Enter Workflow Subtype</Form.Label>
            <Form.Control 
              as="select" 
              value={workflowSubtype}
              onChange={(e) => setWorkflowSubtype(e.target.value)}
            >
              <option value="">Select subtype</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="outline-secondary" 
          onClick={handleClose} 
          style={{ color: 'black', borderColor: 'transparent' }}
        >
          Dismiss
        </Button>
        <Button 
          variant="primary" 
          onClick={handleCreate} 
          style={{ borderRadius: '20px' }}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WorkflowModal;
