import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import WorkflowModal from './workflowModal';
import { DnDProvider } from './DnDContext';
import DnDFlow from './DnDFlow'; 
import './Dashboard.css'; 

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [workflowName, setWorkflowName] = useState('');

  const handleWorkflowCreate = (name) => {
    setWorkflowName(name);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      {workflowName && (
        <div className="container-fluid bg-slate-100 w-100">
          <h2 className="ml-4 text-lg font-semibold">
            {workflowName}
          </h2>
        </div>
      )}

      <div className="flex-fill d-flex mt-1">
        <DnDProvider>
          <div className="flex-1 flex flex-col items-center justify-center">
            {workflowName ? (
              <DnDFlow />
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <h1 className="text-xl font-extrabold">
                  Drag and drop the task element to build workflow
                </h1>
              </div>
            )}
          </div>
          <Sidebar />
        </DnDProvider>
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
