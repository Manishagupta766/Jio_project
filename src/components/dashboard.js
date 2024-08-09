import React from 'react'
import Header from './header'
import Footer from './footer'
import '../index.css';

import Sidebar from './sidebar';

const Dashboard = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-fill d-flex mt-1 ">
      <div className="content flex-grow-1 ms-3 p-2" style={{ marginRight: '250px' }}>
    
    </div>
       <Sidebar/>
      </div>
      <Footer  className="-mt-8px"/>
    </div>
  );
};

export default Dashboard