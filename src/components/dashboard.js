import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import WorkflowModal from './workflowModal';
import DnDFlow from './DnDFlow';
import './Dashboard.css';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [nodes, setNodes] = useState([]); // Manage nodes at the Dashboard level
  const [edges, setEdges] = useState([]); // Manage edges at the Dashboard level

  useEffect(() => {
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];
    setWorkflows(savedWorkflows);
  }, []);

  const handleWorkflowCreate = (name) => {
    const newWorkflow = {
      _id: Date.now().toString(),
      workflowName: name,
      flow: [] // Initialize with empty flow (nodes/edges)
    };

    const updatedWorkflows = [...workflows, newWorkflow];

    setWorkflows(updatedWorkflows);

    localStorage.setItem('workflows', JSON.stringify(updatedWorkflows));

    setWorkflowName(newWorkflow.workflowName);
    setSelectedWorkflow(newWorkflow.workflowName); // Set the newly created workflow as selected
  };

  const handleWorkflowSelect = (workflowName) => {
    setWorkflowName(workflowName);
    setSelectedWorkflow(workflowName);

    // Load the nodes and edges of the selected workflow
    const storedWorkflows = JSON.parse(localStorage.getItem('workflows')) || [];
    const selectedWorkflowData = storedWorkflows.find(
      (workflow) => workflow.workflowName === workflowName
    );

    if (selectedWorkflowData) {
      const { nodes: storedNodes = [], edges: storedEdges = [] } = selectedWorkflowData.flow || {};
      setNodes(storedNodes); // Load the saved nodes
      setEdges(storedEdges); // Load the saved edges
    }
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
            <DnDFlow
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              workflows={workflows}
              selectedWorkflow={selectedWorkflow}
            />
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
                  onWorkflowSelect={handleWorkflowSelect}
                  workflows={workflows}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <Footer
        nodes={nodes}
        edges={edges}
        workflows={workflows}
        selectedWorkflow={selectedWorkflow}
        setSelectedWorkflow={setSelectedWorkflow}
        setShowModal={setShowModal}
        showModal={showModal}
      />

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
