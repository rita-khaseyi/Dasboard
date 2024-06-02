import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './upcomingInvoices.css';

const UpcomingInvoices = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('http://localhost:3001/invoices?_sort=dueDate&_order=asc&_limit=2');
                setInvoices(response.data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, []);

    const handleCollectPayment = async (invoice) => {
        try {
            console.log('Collecting payment for:', invoice.schoolName);
        } catch (error) {
            console.error('Error collecting payment:', error);
        }
    };

    return (
        <div className="card upcoming-invoices">
            <h3>Upcoming Invoices</h3>
            <ul>
                {invoices.map(invoice => (
                    <li key={invoice.id} className="invoice-item">
                        <div className="invoice-details">
                            <strong>School Name:</strong> {invoice.schoolName}<br />
                            <strong>Amount Due:</strong> ${invoice.amountDue}<br />
                            <strong>Due Date:</strong> {invoice.dueDate}<br />
                            <button className="collect-button" onClick={() => handleCollectPayment(invoice)}>Collect Payment</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpcomingInvoices;
