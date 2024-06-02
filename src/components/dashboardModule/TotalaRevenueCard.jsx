import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './revenue.css';

const TotalRevenueCard = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await axios.get('http://localhost:3001/revenue');
                const revenueData = response.data;
                const total = revenueData.reduce((acc, revenue) => acc + revenue.amount, 0);
                setTotalRevenue(total);
            } catch (error) {
                console.error('Error fetching revenue:', error);
            }
        };

        fetchRevenue();
    }, []);

    return (
        <div className="revecard">
            <h3>Total Revenue</h3>
            <div>Total Revenue: ${totalRevenue}</div>
        </div>
    );
};

export default TotalRevenueCard;
