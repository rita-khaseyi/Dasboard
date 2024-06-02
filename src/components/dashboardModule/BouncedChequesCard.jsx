import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BouncedChequesCard.css';

const BouncedChequesCard = () => {
    const [bouncedCheques, setBouncedCheques] = useState(0);

    useEffect(() => {
        const fetchBouncedCheques = async () => {
            try {
                const response = await axios.get('http://localhost:3001/bouncedCheques');
                const bouncedChequesData = response.data;
                setBouncedCheques(bouncedChequesData.length);
            } catch (error) {
                console.error('Error fetching bounced cheques:', error);
            }
        };

        fetchBouncedCheques();
    }, []);

    return (
        <div className="bouncecard">
            <h3>Bounced Cheques</h3>
            <div className="cheque-count">Total Bounced Cheques: {bouncedCheques}</div>
        </div>
    );
};

export default BouncedChequesCard;
