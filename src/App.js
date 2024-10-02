// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import Dashboard from './components/dashboard';
import { DnDProvider } from './components/DnDContext'; // Ensure this path is correct

import './App.css';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <DnDProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </DnDProvider>
      </Router>
    </Provider>
  );
}

export default App;
