import React from 'react';
import Sidebar from './sidebar/Sidebar';
import LandingPage from './sidebar/LandingPage';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <LandingPage />
    </div>
  );
}

export default DashboardLayout;
