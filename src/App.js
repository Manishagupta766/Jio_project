import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';


import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Dashboard />} />
        
        <Route path="/dashboard" element={<Dashboard  />} />

       
      </Routes>
    </Router>
  );
}

export default App;
