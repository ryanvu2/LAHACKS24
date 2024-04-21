import React from 'react';
import './Modal.css'; // Importing the CSS file for styling

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div id="modalHeader">
                    <button className="modal-close-button" onClick={onClose}>X</button>
                </div>
                <div className="modal-content">
                    {children}
                    {/* Dynamic Numbered List with formatted items */}
                    <ol className="formatted-list">
                        <li><strong>Header:</strong> Keyword</li>
                        <li><strong>Another Header:</strong> Another Keyword</li>
                        <li><strong>Final Header:</strong> Final Keyword</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default Modal;
