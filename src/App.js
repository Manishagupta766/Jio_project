import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Canvas from './components/Canvas';

import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Dashboard />} />
        <Route path="/canvas" element={<Canvas />} /> 
        <Route path="/dashboard" element={<Dashboard  />} />

       
      </Routes>
    </Router>
  );
}

export default App;
