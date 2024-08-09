import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Canvas from './components/Canvas';
import WorkflowModal from './components/workflowModal'; // Import your modal if needed
import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for your pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/canvas" element={<Canvas />} /> 
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
