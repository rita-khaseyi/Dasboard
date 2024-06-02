import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './SchoolDetails.css';
import Sidebar from '../sidebar/Sidebar';

const SchoolDetails = () => {
    <Sidebar/>
    const { schoolId } = useParams();
    const [school, setSchool] = useState(null);
    const [invoices, setInvoices] = useState([]);
  

    useEffect(() => {
        const fetchSchoolDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/schools/${schoolId}`);
                setSchool(response.data);
            } catch (error) {
                console.error('Error fetching school details:', error);
            }
        };

        const fetchInvoices = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/invoices?schoolName=${school?.name}`);
                setInvoices(response.data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchSchoolDetails();
        fetchInvoices();
    }, [schoolId, school?.name]);

    if (!school) return <div>Loading...</div>;

    return (
        <div className="school-details">
            <h3>{school.name}</h3>
            <p><strong>Type:</strong> {school.type}</p>
            <p><strong>Product:</strong> {school.product}</p>
            <p><strong>County:</strong> {school.county}</p>
            <p><strong>Registration Date:</strong> {school.registrationDate}</p>
            <p><strong>Contact:</strong> {school.contact}</p>
            <p><strong>Balance:</strong> ${school.balance}</p>

            <h4>Invoices</h4>
            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Invoice Item</th>
                        <th>Creation Date</th>
                        <th>Due Date</th>
                        <th>Amount</th>
                        <th>Paid Amount</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Days Until Due</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(invoice => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.invoiceItem}</td>
                            <td>{invoice.creationDate}</td>
                            <td>{invoice.dueDate}</td>
                            <td>{invoice.amount}</td>
                            <td>{invoice.paidAmount}</td>
                            <td>{invoice.balance}</td>
                            <td>{invoice.status}</td>
                            <td>{invoice.daysUntilDue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="navigation-links">
                <Link to={`/schools/${schoolId}/invoices`}>Manage Invoices</Link>
                <Link to={`/schools/${schoolId}/collections`}>Manage Collections</Link>
            </div>
        </div>
    );
};

export default SchoolDetails;
