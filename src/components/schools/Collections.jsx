import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './collections.css';

const Collections = () => {
    const { schoolId } = useParams();
    const [collections, setCollections] = useState([]);
    const [newCollection, setNewCollection] = useState({
        invoiceId: '',
        collectionNumber: '',
        date: '',
        amount: 0,
        status: 'Valid',
    });

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/collections?schoolId=${schoolId}`);
                setCollections(response.data);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };

        fetchCollections();
    }, [schoolId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCollection({ ...newCollection, [name]: value });
    };

    const handleAddCollection = async () => {
        try {
            const response = await axios.post('http://localhost:3001/collections', newCollection);
            setCollections([...collections, response.data]);
            setNewCollection({
                invoiceId: '',
                collectionNumber: '',
                date: '',
                amount: 0,
                status: 'Valid',
            });

            // Update invoice status based on the new collection
            const invoiceResponse = await axios.get(`http://localhost:3001/invoices/${newCollection.invoiceId}`);
            const invoice = invoiceResponse.data;
            const updatedPaidAmount = invoice.paidAmount + newCollection.amount;
            const updatedBalance = invoice.amount - updatedPaidAmount;
            const updatedStatus = updatedBalance === 0 ? 'Completed' : 'Pending';

            await axios.patch(`http://localhost:3001/invoices/${newCollection.invoiceId}`, {
                paidAmount: updatedPaidAmount,
                balance: updatedBalance,
                status: updatedStatus,
            });
        } catch (error) {
            console.error('Error adding collection:', error);
        }
    };

    const handleUpdateCollectionStatus = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:3001/collections/${id}`, { status: newStatus });
            setCollections(
                collections.map(collection =>
                    collection.id === id ? { ...collection, status: newStatus } : collection
                )
            );
        } catch (error) {
            console.error('Error updating collection status:', error);
        }
    };

    return (
        <div className="collections">
            <h3>Collections</h3>
            <table className="collection-table">
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Collection Number</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {collections.map(collection => (
                        <tr key={collection.id}>
                            <td>{collection.invoiceId}</td>
                            <td>{collection.collectionNumber}</td>
                            <td>{collection.date}</td>
                            <td>{collection.amount}</td>
                            <td>{collection.status}</td>
                            <td>
                                <button onClick={() => handleUpdateCollectionStatus(collection.id, 'Valid')}>Mark as Valid</button>
                                <button onClick={() => handleUpdateCollectionStatus(collection.id, 'Bounced')}>Mark as Bounced</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4>Add New Collection</h4>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="invoiceId"
                    value={newCollection.invoiceId}
                    onChange={handleInputChange}
                    placeholder="Invoice ID"
                />
                <input
                    type="text"
                    name="collectionNumber"
                    value={newCollection.collectionNumber}
                    onChange={handleInputChange}
                    placeholder="Collection Number"
                />
                <input
                    type="date"
                    name="date"
                    value={newCollection.date}
                    onChange={handleInputChange}
                    placeholder="Date"
                />
                <input
                    type="number"
                    name="amount"
                    value={newCollection.amount}
                    onChange={handleInputChange}
                    placeholder="Amount"
                />
                <select name="status" value={newCollection.status} onChange={handleInputChange}>
                    <option value="Valid">Valid</option>
                    <option value="Bounced">Bounced</option>
                </select>
                <button type="button" onClick={handleAddCollection}>Add Collection</button>
            </form>
        </div>
    );
};

export default Collections;
