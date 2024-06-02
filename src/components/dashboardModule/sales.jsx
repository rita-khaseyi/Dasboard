// src/components/DashboardLayout.jsx
import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Dashboard from './Dashboard';

function SalesLayout() {
  return (
    <div classNamess="dashboard-layout">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default SalesLayout;
