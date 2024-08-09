import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkflowModal = ({ show, handleClose, title }) => {
  const [workflowName, setWorkflowName] = useState('');
  const [workflowType, setWorkflowType] = useState('');
  const [workflowSubtype, setWorkflowSubtype] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    if (workflowName && workflowType && workflowSubtype) {
      navigate('/canvas');
    } else {
      alert('Please fill in all fields.');
    }
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
            <div className="mb-2 p-0 ">
              <label className="block text-gray-700 mb-2 flex items-center">
                <span className="mr-1">Enter Workflow Name</span>
                <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-b-2 border-black focus:outline-none focus:ring-0 focus:border-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 flex items-center">
                <span className="mr-1">Enter Workflow Type</span>
                <span className="text-red-500">*</span>
              </label>
              <select 
                value={workflowType}
                onChange={(e) => setWorkflowType(e.target.value)}
                className="block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-b-2 border-black focus:outline-none focus:ring-0 focus:border-black"
              >
                <option value="">Select type</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 flex items-center">
                <span className="mr-1">Enter Workflow Subtype</span>
                <span className="text-red-500">*</span>
              </label>
              <select 
                value={workflowSubtype}
                onChange={(e) => setWorkflowSubtype(e.target.value)}
                className="block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-b-2 border-black focus:outline-none focus:ring-0 focus:border-black"
              >
                <option value="">Select subtype</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </form>
        </div>
        <div className="flex justify-end p-4 ">
          <button 
            onClick={handleClose} 
            className="bg-gray-200 text-black py-2 px-4 rounded-md mr-2 hover:bg-gray-300 "  style={{ borderRadius: '20px' }}
          >
            Dismiss
          </button>
          <button 
            onClick={handleCreate} 
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800  "  style={{ borderRadius: '20px' }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowModal;
