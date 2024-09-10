import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../index.css';
import { useDnD } from './DnDContext';

const CustomButton = ({ text, onClick, onDragStart }) => {
  return (
    <div
      className="bg-gray-300 bg-opacity-90 text-black p-3 rounded-lg border-2 my-4 mx-auto text-center cursor-pointer text-lg transition-all duration-300 hover:bg-opacity-80"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
      draggable
      onDragStart={onDragStart}
    >
      {text}
    </div>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onDragStart: PropTypes.func.isRequired,
};

const Sidebar = ({ showModal, onWorkflowSelect }) => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState('');

  // Fetch workflows from localStorage on component load
  useEffect(() => {
    try {
      const savedWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];
      if (Array.isArray(savedWorkflows)) {
        setWorkflows(savedWorkflows);
        setFilteredWorkflows(savedWorkflows);
      } else {
        setWorkflows([]);
        setFilteredWorkflows([]);
      }
    } catch (error) {
      console.error('Failed to parse workflows from localStorage:', error);
      setWorkflows([]);
      setFilteredWorkflows([]);
    }
  }, [showModal]);

  // Handle workflow dropdown selection
  const handleDropdownChange = (e) => {
    const selectedId = e.target.value;
    setSelectedWorkflow(selectedId);

    const selectedWorkflowObj = workflows.find(workflow => workflow._id === selectedId);
    if (selectedWorkflowObj) {
      if (typeof onWorkflowSelect === 'function') {
        onWorkflowSelect(selectedWorkflowObj.workflowName);
      } else {
        console.error('onWorkflowSelect is not a function');
      }
      navigate('/', { state: { workflowName: selectedWorkflowObj.workflowName } });
    }
  };

  const [_, setType] = useDnD();  // For setting node type for dragging

  // Handles the drag start event
  const onDragStart = (event, nodeType) => {
    setType(nodeType);  // Set the node type in the DnD context
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="p-3 bg-white border-r border-gray-200" style={{ width: '400px' }}>
      {/* Workflow Dropdown */}
      <div className="relative mb-4">
        <select
          id="workflow_select"
          className="block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-b-2 border-black focus:outline-none focus:ring-0 focus:border-black"
          value={selectedWorkflow}
          onChange={handleDropdownChange}
        >
          <option value="" disabled>Select Workflow</option>
          {filteredWorkflows.map(workflow => (
            <option key={workflow._id} value={workflow._id}>
              {workflow.workflowName}
            </option>
          ))}
        </select>
      </div>

      {/* Drag Nodes */}
      <h5 className="mb-4 mt-4 text-lg font-semibold">You can drag these nodes to the pane on the right.</h5>
      
      {/* Start Event Button */}
      <CustomButton
        text='Start Event'
        onDragStart={(event) => onDragStart(event, 'input')}  // Start event node
      />
      
      {/* Users Event Button */}
      <CustomButton
        text="Users Event"
        onDragStart={(event) => onDragStart(event, 'default')}  // User event node
      />
      
      {/* End Event Button */}
      <CustomButton
        text="End Event"
        onDragStart={(event) => onDragStart(event, 'output')}  // End event node
      />
    </div>
  );
};

Sidebar.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onWorkflowSelect: PropTypes.func.isRequired,
};

export default Sidebar;
