import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import SchoolsList from './SchoolsList';

function SchoolLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <SchoolsList />
    </div>
  );
}

export default SchoolLayout;
