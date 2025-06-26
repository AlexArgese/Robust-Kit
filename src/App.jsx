// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar  from './components/Navbar';
import Home    from './components/Home';
import How     from './components/How';
import Results from './components/Results';
import Started from './components/Started';
import Footer  from './components/Footer';   
import DeviceGuard from './DeviceGuard';

import './App.css';

function App() {
  return (
    <DeviceGuard>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/"    element={<Home />} />
            <Route path="/how" element={<How  />} />
            <Route path="/results" element={<Results />} />
            <Route path='/started' element={<Started />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </DeviceGuard>
  );
}

export default App;
