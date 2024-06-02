import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/Layout';
import SalesLayout from './components/dashboardModule/sales';
import SchoolLayout from './components/schools/school';
import Schooldetails from './components/schools/details';
import InvoiceLayout from './components/schools/invoice';
import CollectionLayout from './components/schools/collect';

function App() {
  return (
    <Router>
      <div className="app">
        
        <div className="content">
          <Routes>
          <Route path="/" element={<DashboardLayout />} />
            <Route path="/dashboard" element={<SalesLayout />} />
            <Route path="/schools" element={<SchoolLayout />} />
            <Route path="/schools/:schoolId" element={<Schooldetails />} />
            <Route path="/schools/:schoolId/invoices" element={<InvoiceLayout />} />
            <Route path="/schools/:schoolId/collections" element={<CollectionLayout />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
