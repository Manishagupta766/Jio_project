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


const Sidebar = ({ showModal, setWorkflowName, workflows, selectedWorkflow }) => {
  const navigate = useNavigate();
  const [filteredWorkflows, setFilteredWorkflows] = useState([]);

  
  useEffect(() => {
    try {
      const savedWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];
      if (Array.isArray(savedWorkflows)) {
        setFilteredWorkflows(savedWorkflows);
      } else {
        setFilteredWorkflows([]);
      }
    } catch (error) {
      console.error('Failed to parse workflows from localStorage:', error);
      setFilteredWorkflows([]);
    }
  }, [showModal]);

  const handleDropdownChange = (e) => {
    const selectedId = e.target.value;
    const selectedWorkflowObj = filteredWorkflows.find(workflow => workflow._id === selectedId);

    if (selectedWorkflowObj) {
      console.log('Dropdown selected workflow:', selectedWorkflowObj.workflowName); 
    
    
      navigate('/', { state: { workflowName: selectedWorkflowObj.workflowName } });
    }
  };

  const [_, setType] = useDnD();  
  const onDragStart = (event, nodeType) => {
    setType(nodeType);  
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="p-3 bg-white border-r border-gray-200" style={{ width: '400px' }}>
     
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

      <h5 className="mb-4 mt-4 text-lg font-semibold">You can drag these nodes to the pane on the right.</h5>
      
   
      <CustomButton
        text='Start Event'
        onDragStart={(event) => onDragStart(event, 'input')} 
      />
      

      <CustomButton
        text="Users Event"
        onDragStart={(event) => onDragStart(event, 'default')}  
      />
      
    
      <CustomButton
        text="End Event"
        onDragStart={(event) => onDragStart(event, 'output')} 
      />
    </div>
  );
};



export default Sidebar;
