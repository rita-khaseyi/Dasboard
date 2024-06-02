import React from 'react';
import CollectionsCard from './CollectionsCard';
import SignupsCard from './SignupsCard';
import TotalRevenueCard from './TotalaRevenueCard';
import BouncedChequesCard from './BouncedChequesCard';
import './Dasboard.css';
const Cards= () => {
    return (
        <div className="dashboard">
            <CollectionsCard />
            <SignupsCard />
            <TotalRevenueCard />
            <BouncedChequesCard />
  

        </div>
    );
};

export default Cards;
