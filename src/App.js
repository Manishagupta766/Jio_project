import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import { DnDProvider } from './components/DnDContext'; // Ensure this path is correct

import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <DnDProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </DnDProvider>
    </Router>
  );
}

export default App;
