import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Tours from './components/Tours';
import Bookings from './components/Bookings';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import Commission from './components/Commission';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/commission" element={<Commission />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 