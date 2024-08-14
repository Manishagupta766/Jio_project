import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import './Dashboard.css';
import Sidebar from './sidebar';

const Dashboard = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const workflowName = location.state?.workflowName || '';

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <h className="container-fluid bg-slate-100 w-20">
      {workflowName && (
              <h2 className="ml-4 text-lg font-semibold">
                 {workflowName}
              </h2>
            )}
      </h>
      {/* //use usestate for this workflow name  */}
      
      <div className="flex-fill d-flex mt-1">
        <div className="content flex-grow-1 ms-3 p-2 flex items-center justify-center">
          <div className="flex items-center">
            <h1 className="text-center text-xl font-extrabold">
              Drag and drop the task element to build workflow
            </h1>
            
          </div>
        </div>
        <Sidebar  showModal={showModal}/>
      </div>
      <Footer className="-mt-8px" setShowModal={setShowModal } showModal={showModal} />
    </div>
  );
};

export default Dashboard;
