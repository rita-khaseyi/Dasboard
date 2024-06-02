import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './invoices.css';

const Invoices = () => {
    const { schoolId } = useParams();
    const [invoices, setInvoices] = useState([]);
    const [newInvoice, setNewInvoice] = useState({
        schoolName: '',
        invoiceItem: '',
        creationDate: '',
        dueDate: '',
        amount: 0,
        paidAmount: 0,
        balance: 0,
        status: 'Pending',
    });
    const [editingInvoice, setEditingInvoice] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/invoices?schoolId=${schoolId}`);
                setInvoices(response.data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, [schoolId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInvoice({ ...newInvoice, [name]: value });
    };

    const handleAddInvoice = async () => {
        try {
            const response = await axios.post('http://localhost:3001/invoices', newInvoice);
            setInvoices([...invoices, response.data]);
            setNewInvoice({
                schoolName: '',
                invoiceItem: '',
                creationDate: '',
                dueDate: '',
                amount: 0,
                paidAmount: 0,
                balance: 0,
                status: 'Pending',
            });
        } catch (error) {
            console.error('Error adding invoice:', error);
        }
    };

    const handleDeleteInvoice = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/invoices/${id}`);
            setInvoices(invoices.filter(invoice => invoice.id !== id));
        } catch (error) {
            console.error('Error deleting invoice:', error);
        }
    };

    const handleEditInvoice = (invoice) => {
        setEditingInvoice(invoice);
    };

    const handleUpdateInvoice = async () => {
        try {
            await axios.put(`http://localhost:3001/invoices/${editingInvoice.id}`, editingInvoice);
            setInvoices(invoices.map(invoice => (invoice.id === editingInvoice.id ? editingInvoice : invoice)));
            setEditingInvoice(null);
        } catch (error) {
            console.error('Error updating invoice:', error);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingInvoice({ ...editingInvoice, [name]: value });
    };

    return (
        <div className="invoices">
            <h3>Invoices</h3>
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
                        <th>Actions</th>
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
                            <td>
                                <button onClick={() => handleEditInvoice(invoice)}>Edit</button>
                                <button onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingInvoice && (
                <div>
                    <h4>Edit Invoice</h4>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            name="invoiceItem"
                            value={editingInvoice.invoiceItem}
                            onChange={handleEditInputChange}
                            placeholder="Invoice Item"
                        />
                        <input
                            type="date"
                            name="creationDate"
                            value={editingInvoice.creationDate}
                            onChange={handleEditInputChange}
                            placeholder="Creation Date"
                        />
                        <input
                            type="date"
                            name="dueDate"
                            value={editingInvoice.dueDate}
                            onChange={handleEditInputChange}
                            placeholder="Due Date"
                        />
                        <input
                            type="number"
                            name="amount"
                            value={editingInvoice.amount}
                            onChange={handleEditInputChange}
                            placeholder="Amount"
                        />
                        <input
                            type="number"
                            name="paidAmount"
                            value={editingInvoice.paidAmount}
                            onChange={handleEditInputChange}
                            placeholder="Paid Amount"
                        />
                        <input
                            type="number"
                            name="balance"
                            value={editingInvoice.balance}
                            onChange={handleEditInputChange}
                            placeholder="Balance"
                        />
                        <select name="status" value={editingInvoice.status} onChange={handleEditInputChange}>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button type="button" onClick={handleUpdateInvoice}>Update Invoice</button>
                    </form>
                </div>
            )}

            <h4>Add New Invoice</h4>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="invoiceItem"
                    value={newInvoice.invoiceItem}
                    onChange={handleInputChange}
                    placeholder="Invoice Item"
                />
                <input
                    type="date"
                    name="creationDate"
                    value={newInvoice.creationDate}
                    onChange={handleInputChange}
                    placeholder="Creation Date"
                />
                <input
                    type="date"
                    name="dueDate"
                    value={newInvoice.dueDate}
                    onChange={handleInputChange}
                    placeholder="Due Date"
                />
                <input
                    type="number"
                    name="amount"
                    value={newInvoice.amount}
                    onChange={handleInputChange}
                    placeholder="Amount"
                />
                <input
                    type="number"
                    name="paidAmount"
                    value={newInvoice.paidAmount}
                    onChange={handleInputChange}
                    placeholder="Paid Amount"
                />
                <input
                    type="number"
                    name="balance"
                    value={newInvoice.balance}
                    onChange={handleInputChange}
                    placeholder="Balance"
                />
                <select name="status" value={newInvoice.status} onChange={handleInputChange}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
                <button type="button" onClick={handleAddInvoice}>Add Invoice</button>
            </form>
        </div>
    );
};

export default Invoices;
