import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import WorkflowModal from './workflowModal';
 
import DnDFlow from './DnDFlow'; 
import './Dashboard.css'; 
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [workflows, setWorkflows] = useState([]); 

  useEffect(() => {
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];
    setWorkflows(savedWorkflows);
  }, []);

  const handleWorkflowCreate = (name) => {
    const newWorkflow = {
      _id: Date.now().toString(),
      workflowName: name,
    };

    const updatedWorkflows = [...workflows, newWorkflow];
    
    setWorkflows(updatedWorkflows);
    localStorage.setItem('workflows', JSON.stringify(updatedWorkflows));
    setWorkflowName(newWorkflow.workflowName);
  };
const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {location?.state?.workflowName  && (
        <div className="bg-slate-100 w-full p-4">
          <h2 className="text-lg font-semibold">
            {location?.state?.workflowName }
          </h2>
        </div>
      )}

      <div className="flex flex-1 mt-1">
        <div className="flex-1 flex">
          {location?.state?.workflowName ? (
            <DnDFlow  setWorkflowName={setWorkflowName}/>
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
                  setWorkflowName={setWorkflowName}
                  workflows={workflows}
                  selectedWorkflow={location?.state?.workflowName } 
                />
              </div>
            </>
          )}
        </div>
      </div>

      <Footer setShowModal={setShowModal} showModal={showModal}  selectedWorkflow={location?.state?.workflowName } />

      <WorkflowModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="Create New Workflow"
        onCreate={handleWorkflowCreate}
      />
    </div>
  );
}

export default Dashboard;
