import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.css';

function Modal({ isOpen, onClose, userId, theDate }) {
    const [dailyTextAns, setDailyTextAns] = useState(null);
    const date = theDate;
    const id = userId;
    console.log("date coming in: " + date);
    console.log("id coming in: " + id);

    useEffect(() => {
        console.log("UserId:", userId, "Date:", theDate);  // Log to verify that userId and theDate are set
        const fetchDailyTextAns = async () => {
            if (!userId || !theDate) {
                console.log("Missing userId or theDate");  // Additional log for debugging
                return;
            }
    
            try {
                const url = `http://localhost:4000/api/users/${id}/getDailyTextAns/${date}`;
                console.log("Making request to:", url);  // Log the request URL
                const response = await axios.get(url);
                setDailyTextAns(response.data.dailyTextAns);
                console.log("Request successful", response.data.dailyTextAns);  // Log successful request data
            } catch (error) {
                console.error("Failed to fetch daily text answers:", error);
                setDailyTextAns(null);
            }
        };
    
        fetchDailyTextAns();
    }, [userId, theDate]);  // Ensure these are the correct dependencies

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <button className="modal-close-button" onClick={onClose}>X</button>
                </div>
                <div className="modal-content">
                    {dailyTextAns ? (
                        <div>
                            <strong>Date:</strong> {theDate}<br />
                            <strong>Details:</strong>
                            {Object.entries(dailyTextAns).map(([key, value], index) => (
                                <div key={index}>
                                    <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No daily text answers available for {theDate}.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;
