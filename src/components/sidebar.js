import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const CustomButton = ({ text, onClick }) => {
  return (
    <div 
      className="bg-gray-300 bg-opacity-90 text-black p-3 rounded-lg border-2 my-4 mx-auto text-center cursor-pointer text-lg transition-all duration-300 hover:bg-opacity-80"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState([]);
 const {showModal}= props;
  const [selectedWorkflow, setSelectedWorkflow] = useState('');

  useEffect(() => {
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];
    setWorkflows(savedWorkflows);
    setFilteredWorkflows(savedWorkflows);
  }, [showModal]);

  

 

  const handleDropdownChange = (e) => {
    const selectedId = e.target.value;
    
    setSelectedWorkflow(selectedId);

    const selectedWorkflow = workflows.find(workflow => workflow._id === selectedId);
     if (selectedWorkflow) {
    //  need to change nevigate part 
   navigate('/', { state: { workflowName: selectedWorkflow.workflowName } });
     }
  };

  const buttonLabels = [
    'Start Event',
    'User Event',
    'Conditional Event',
    'Sub Processes',
    'End Event'
  ];

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

      {buttonLabels.map((label, index) => (
        <CustomButton key={index} text={label} onClick={() => alert(`${label} clicked!`)} />
      ))}
    </div>
  );
};

export default Sidebar;
