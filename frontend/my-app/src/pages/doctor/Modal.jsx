import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.css';

function Modal({ isOpen, onClose, userId, theDate }) {
    const [userDetails, setUserDetails] = useState(null);
    const date = theDate;
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
                setUserDetails(null);
            }
        };

        if (userId) fetchUserData();
    }, [userId]);

    if (!isOpen || !userDetails) return null;

    const dailyTextAns = userDetails.dailyTextAns || {};
    console.log(dailyTextAns);
    const dailyTextAnsEntries = Object.entries(dailyTextAns);

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <button className="modal-close-button" onClick={onClose}>X</button>
                </div>
                <div className="modal-content">
                    {dailyTextAnsEntries.length > 0 ? (
                        dailyTextAnsEntries.map(([key, value], index) => (
                            <div key={index}>
                                <strong>{key}:</strong> 
                                {typeof value === 'object' ? (
                                    Object.entries(value).map(([subKey, subValue], subIndex) => (
                                        <div key={subIndex}>
                                            <strong>{subKey}:</strong> {Array.isArray(subValue) ? subValue.join(', ') : subValue}
                                        </div>
                                    ))
                                ) : (
                                    Array.isArray(value) ? value.join(', ') : value
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No daily text answers available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;
