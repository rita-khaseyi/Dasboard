import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CollectionsCard.css';

const CollectionsCard = () => {
    const [totalCollections, setTotalCollections] = useState(0);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get('http://localhost:3001/collections');
                const collectionsData = response.data;
                const total = collectionsData.reduce((acc, collection) => acc + collection.amount, 0);
                setTotalCollections(total);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };

        fetchCollections();
    }, []);

    return (
        <div className="collecard">
            <h3>Collections</h3>
            <div>Total Collections: ${totalCollections}</div>
        </div>
    );
};

export default CollectionsCard;
