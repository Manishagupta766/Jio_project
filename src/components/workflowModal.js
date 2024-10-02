import React, { useState } from "react";

const WorkflowModal = ({ show, handleClose, title, onCreate }) => {
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDesc, setWorkflowDesc] = useState("");
  const [nameExists, setNameExists] = useState(false);
  const [createdWorkflowName, setCreatedWorkflowName] = useState("");
  const [errors, setErrors] = useState({});

  const handleCreate = () => {
    const newErrors = {};
    if (!workflowName) newErrors.name = "Workflow name is required.";
    if (!workflowDesc) newErrors.desc = "Workflow description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const workflow = JSON.parse(localStorage.getItem(key));
      if (workflow.workflowName === workflowName) {
        setNameExists(true);
        return;
      }
    }

    const storedWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];
    const uniqueKey = `workflow_${workflowName}_${Date.now()}`; // Corrected here

    if (localStorage.getItem(uniqueKey)) {
      setNameExists(true);
      return;
    }

    const newWorkflow = {
      _id: uniqueKey,
      workflowName,
      workflowDesc,
      flow: [],
    };

    localStorage.setItem(uniqueKey, JSON.stringify(newWorkflow));
    const updatedWorkflows = [...storedWorkflows, newWorkflow];
    
    localStorage.setItem('workflows', JSON.stringify(updatedWorkflows));

    onCreate(workflowName);
    setCreatedWorkflowName(newWorkflow.workflowName); 

    setWorkflowName("");
    setWorkflowDesc("");
    setNameExists(false);
    setErrors({});
    handleClose();

    const jsonString = JSON.stringify(newWorkflow, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `workflow_${newWorkflow._id}.json`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNameChange = (e) => {
    setWorkflowName(e.target.value);
    setNameExists(false);
    setErrors((prevErrors) => ({ ...prevErrors, name: null }));
  };

  const handleDescChange = (e) => {
    setWorkflowDesc(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, desc: null }));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b border-none">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
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
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
              {nameExists && (
                <p className="text-red-500 text-sm mt-1">
                  Workflow already exists with this name. Please choose a
                  different name.
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 flex items-center">
                <span className="mr-1">Enter Workflow Description</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={workflowDesc}
                onChange={handleDescChange}
                className="block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-b-2 border-black focus:outline-none focus:ring-0 focus:border-black"
              />
              {errors.desc && (
                <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
              )}
            </div>
          </form>
        </div>
        <div className="flex justify-end p-4">
          <button
            onClick={handleClose}
            className="bg-gray-200 text-black py-2 px-4 rounded-md mr-2 hover:bg-gray-300"
            style={{ borderRadius: "20px" }}
          >
            Dismiss
          </button>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800"
            style={{ borderRadius: "20px" }}
          >
            Create
          </button>
        </div>
        {createdWorkflowName && (
          <div className="p-4">
            <p className="text-green-500 text-md">
              Workflow "{createdWorkflowName}" has been created successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowModal;
