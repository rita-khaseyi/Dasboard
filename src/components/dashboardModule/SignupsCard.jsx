import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './signup.css';
const SignupsCard = () => {
    const [totalSignups, setTotalSignups] = useState(0);

    useEffect(() => {
        const fetchSignups = async () => {
            try {
                const response = await axios.get('http://localhost:3001/signups');
                const signupsData = response.data;
                const total = signupsData.reduce((acc, signup) => acc + signup.count, 0);
                setTotalSignups(total);
            } catch (error) {
                console.error('Error fetching signups:', error);
            }
        };

        fetchSignups();
    }, []);

    return (
        <div className="signcard">
            <h3>Sign-ups</h3>
            <div>Total Sign-ups: {totalSignups}</div>
        </div>
    );
};

export default SignupsCard;
