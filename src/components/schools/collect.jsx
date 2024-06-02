import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Collections from './Collections';


function CollectionLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <Collections />
    </div>
  );
}

export default CollectionLayout;
