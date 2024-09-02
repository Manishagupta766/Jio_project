import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import WorkflowModal from './workflowModal';
import { DnDProvider } from './DnDContext'; // Use named import
import DnDFlow from './DnDFlow'; 
import './Dashboard.css'; 

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [workflows, setWorkflows] = useState([]);  // Add state for workflows

  useEffect(() => {
    // Fetch the workflows from localStorage when the component mounts
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];
    setWorkflows(savedWorkflows);
  }, []);

  const handleWorkflowCreate = (name) => {
    const newWorkflow = {
      _id: Date.now().toString(),
      workflowName: name,
    };

    const updatedWorkflows = [...workflows, newWorkflow];

    // Update the workflows state
    setWorkflows(updatedWorkflows);

    // Update localStorage
    localStorage.setItem('workflows', JSON.stringify(updatedWorkflows));

    // Set the new workflow name in the state
    setWorkflowName(newWorkflow.workflowName);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {workflowName && (
        <div className="bg-slate-100 w-full p-4">
          <h2 className="text-lg font-semibold">
            {workflowName}
          </h2>
        </div>
      )}

      <div className="flex flex-1 mt-1">
        <div className="flex-1 flex">
          {workflowName ? (
            <DnDFlow />
          ) : (
            <>
              <div className="flex items-center justify-center h-full w-full">
                <h1 className="text-xl font-extrabold text-center">
                  Drag and drop the task element to build workflow
                </h1>
              </div>
              <div className="flex">
                <Sidebar
                  showModal={showModal}
                  onWorkflowSelect={setWorkflowName}
                  workflows={workflows}  // Pass workflows as a prop
                />
              </div>
            </>
          )}
        </div>
      </div>

      <Footer setShowModal={setShowModal} showModal={showModal} />

      <WorkflowModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="Create New Workflow"
        onCreate={handleWorkflowCreate}
      />
    </div>
  );
};

export default Dashboard;
