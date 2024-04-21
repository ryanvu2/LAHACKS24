import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function DocHome() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();
    const currentUserId = "6624c9fc1f8db651f009463d";  // Use dynamic ID for authenticated user

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/users/${currentUserId}`);
                const patientIds = response.data.doctorsPatients;
                fetchPatientDetails(patientIds);
            } catch (error) {
                console.error('Failed to fetch clients:', error);
            }
        };

        const fetchPatientDetails = async (patientIds) => {
            try {
                const requests = patientIds.map(id =>
                    axios.get(`http://localhost:4000/api/users/${id}`)
                );
                const responses = await Promise.all(requests);
                const patientData = responses.map(res => ({
                    name: `${res.data.firstName} ${res.data.lastName}`,
                    picUrl: res.data.profilePic,
                    id: res.data._id
                }));
                setClients(patientData);
            } catch (error) {
                console.error('Failed to fetch patient details:', error);
            }
        };

        fetchClients();
    }, []);

    const handleProfileClick = (clientId) => {
        console.log(clientId);
        navigate(`/charts/${clientId}`); // Navigate with clientId
    };

    return (
        <div className="card">
            <h1 className="docHomeHeader">Client List</h1>
            <ul className="client-list">
                {clients.map((client, index) => (
                    <li key={index} className="client-item">
                        <button onClick={() => handleProfileClick(client.id)} className="profile-button">
                            <div className="profile-pic" style={{ backgroundImage: `url(${client.picUrl})` }}></div>
                            <p className="client-name">{client.name}</p>  {/* Name now appears under the image */}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DocHome;
