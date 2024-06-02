import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Import the CSS file for this component

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Zeraki Dashboard</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
        <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
          <li><Link to="/schools" className="nav-link">Schools</Link></li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
