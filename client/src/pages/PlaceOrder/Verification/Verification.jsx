import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Verification.css'; // You can create a simple CSS file for styling

const Verification = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying your payment, please wait...");

    const verifyPayment = async () => {
        const pidx = searchParams.get("pidx");
        const status = searchParams.get("status");

        if (status !== "Completed" || !pidx) {
            setMessage("Payment was not successful or has been cancelled.");
            setTimeout(() => navigate('/'), 3000); // Redirect to home after 3 seconds
            return;
        }

        try {
            const response = await fetch('/api/payment/khalti/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pidx }),
            });

            const result = await response.json();

            if (response.ok && result.status.toLowerCase() === 'completed') {
                setMessage("Payment successful! Redirecting to your orders...");
                // On success, navigate the user to their orders page
                setTimeout(() => navigate('/myorders'), 3000);
            } else {
                throw new Error(result.detail || 'Payment verification failed.');
            }
        } catch (error) {
            console.error("Verification error:", error);
            setMessage(`Error: ${error.message}`);
            setTimeout(() => navigate('/'), 3000); // Redirect to home on error
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); // The empty array ensures this effect runs only once on component mount

    return (
        <div className="verification-container">
            <h2>Payment Verification</h2>
            <p>{message}</p>
        </div>
    );
};

export default Verification;
