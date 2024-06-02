import React from 'react';
import CollectionsCard from './CollectionsCard';
import SignupsCard from './SignupsCard';
import TotalRevenueCard from './TotalaRevenueCard';
import BouncedChequesCard from './BouncedChequesCard';
import TargetsPieCharts from './TargetsPieCharts';
import SignupsBarGraphs from './SignupsBarGraphs';
import UpcomingInvoices from './UpcomingInvoices';
import Cards from './Cards';
import './Dasboard.css';
const Dashboard = () => {
    return (
        <div className="dashboard">
            <CollectionsCard />
            <SignupsCard />
            <TotalRevenueCard />
            <BouncedChequesCard />
           <TargetsPieCharts />
            <SignupsBarGraphs /> 
             <UpcomingInvoices />

        </div>
    );
};

export default Dashboard;
