import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const PaymentFormModal = ({ isOpen, onClose, invoice }) => {
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleCollectPayment = async () => {
        try {
            await axios.post('http://localhost:3001/collections', {
                invoiceId: invoice.id,
                amount: paymentAmount,
                method: paymentMethod,
                status: 'Valid' // Default to 'Valid', can be adjusted based on backend logic
            });
            alert('Payment collected successfully!');
            onClose(); // Close modal after successful payment
        } catch (error) {
            console.error('Error collecting payment:', error);
            alert('Failed to collect payment. Please try again.');
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Collect Payment for {invoice.schoolName}</h2>
            <form onSubmit={handleCollectPayment}>
                <label>
                    Payment Amount:
                    <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
                </label>
                <label>
                    Payment Method:
                    <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
                </label>
                <button type="submit">Collect Payment</button>
            </form>
        </Modal>
    );
};

export default PaymentFormModal;
