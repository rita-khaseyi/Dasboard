import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import SchoolDetails from './SchoolDetails';

function Schooldetails() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <SchoolDetails />
    </div>
  );
}

export default Schooldetails;
