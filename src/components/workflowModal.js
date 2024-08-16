import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkflowModal = ({ show, handleClose, title }) => {
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDesc, setWorkflowDesc] = useState('');
  const [nameExists, setNameExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('workflows')) {
      localStorage.setItem('workflows', JSON.stringify([]));
    }
  }, []);

  const handleCreate = () => {
    if (workflowName && workflowDesc) {
      const existingWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];

    
      const isDuplicate = existingWorkflows.some(workflow => workflow.workflowName === workflowName);
      if (isDuplicate) {
        setNameExists(true);
        return;
      }

      const newWorkflow = {
        _id: `${workflowName}_${Date.now()}`, 
        workflowName,
        workflowDesc,
        flow: []
      };

      existingWorkflows.push(newWorkflow);

      localStorage.setItem(`workflows`, JSON.stringify(newWorkflow));

      const jsonString = JSON.stringify(existingWorkflows, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = ' newworkflows.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      navigate('/dashboard', { state: { workflowName } });

      setWorkflowName('');
      setWorkflowDesc('');
      setNameExists(false);

      handleClose(); 
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleNameChange = (e) => {
    setWorkflowName(e.target.value);
    setNameExists(false); 
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b border-none">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="p-4">
          <form>
            <div className="mb-2 p-0">
              <label className="block text-gray-700 mb-2 flex items-center">
                <span className="mr-1">Enter Workflow Name</span>
                <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={workflowName}
                onChange={handleNameChange}
                className="block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-b-2 border-black focus:outline-none focus:ring-0 focus:border-black"
              />
              {nameExists && <p className="text-red-500 text-sm mt-1">This workflow name already exists. Please choose a different name.</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 flex items-center">
                <span className="mr-1">Enter Workflow Description</span>
                <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={workflowDesc}
                onChange={(e) => setWorkflowDesc(e.target.value)}
                className="block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-b-2 border-black focus:outline-none focus:ring-0 focus:border-black"
              />
            </div>
          </form>
        </div>
        <div className="flex justify-end p-4">
          <button 
            onClick={handleClose} 
            className="bg-gray-200 text-black py-2 px-4 rounded-md mr-2 hover:bg-gray-300"
            style={{ borderRadius: '20px' }}
          >
            Dismiss
          </button>
          <button 
            onClick={handleCreate} 
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800"
            style={{ borderRadius: '20px' }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowModal;
