import React from 'react';
import './HomePage.css';

function DocHome() {
    const clients = [
        { name: "Alice Johnson", picUrl: "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=" },
        { name: "Bob Smith", picUrl: "url_to_bob's_picture.jpg" },
        { name: "Carol Taylor", picUrl: "url_to_carol's_picture.jpg" },
        { name: "David Brown", picUrl: "url_to_david's_picture.jpg" },
        { name: "Eve White", picUrl: "url_to_eve's_picture.jpg" },
        { name: "Frank Jones", picUrl: "url_to_frank's_picture.jpg" },
        { name: "Grace Lee", picUrl: "url_to_grace's_picture.jpg" },
        { name: "Henry Garcia", picUrl: "url_to_henry's_picture.jpg" },
        { name: "Isabel Martinez", picUrl: "url_to_isabel's_picture.jpg" },
        { name: "John Doe", picUrl: "url_to_john's_picture.jpg" }
    ];

    // Placeholder for handling click, you'll need to implement actual navigation or logic
    const handleProfileClick = (client) => {
        console.log("Navigating to profile of:", client.name);
        // Example: navigate(`/profile/${client.name}`); // If using React Router
    };

    return (
        <div className="card">
            <h1 class = "docHomeHeader">Client List</h1>
            <ul className="client-list">
                {clients.map((client, index) => (
                    <li key={index} className="client-item">
                        <button onClick={() => handleProfileClick(client)} className="profile-button">
                            <div className="profile-pic" style={{ backgroundImage: `url(${client.picUrl})` }}></div>
                        </button>
                        {/* <div className="profile-pic" style={{ backgroundImage: `url(${client.picUrl})` }}></div> */}
                        <p className="client-name">{client.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DocHome;
