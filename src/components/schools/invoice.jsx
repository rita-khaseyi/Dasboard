import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Invoices from './Invoices';


function InvoiceLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <Invoices />
    </div>
  );
}

export default InvoiceLayout;
