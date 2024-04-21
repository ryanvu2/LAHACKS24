import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Charts.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Charts() {
    const navigate = useNavigate();
    const { userId } = useParams();
    console.log("id is:", userId);
    const [user, setUser] = useState({ firstName: '', lastName: '' });
    const [value, onChange] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [periodicData, setPeriodicData] = useState("Loading...");
    const [isPeriodicModalOpen, setIsPeriodicModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const userResponse = await axios.get(`http://localhost:4000/api/users/${userId}`);
                setUser(userResponse.data);
                const response = await axios.get(`http://localhost:4000/api/users/${userId}/processTexts`);
                setPeriodicData(response.data.data);
                setIsPeriodicModalOpen(true);
            } catch (error) {
                console.error('Failed to fetch data or process texts:', error);
            }
        }
        fetchData();
    }, [userId]);

    const pieData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Stress Levels',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            data: [65, 59, 80, 81, 56]
        }]
    };

    const handleLogout = () => navigate('/DocHome');

    const handleDayClick = (date) => {
        onChange(date);
        setSelectedDay(`${date.getMonth() + 1}-${date.getDate()}`);
        setIsModalOpen(true);
        setIsPeriodicModalOpen(false);
    };

    const handleBoxClick = index => {
        console.log("Box clicked:", index);
        // Optionally handle click
    };

    const boxHeaders = [
        "Integrated Thematic Analysis: The overarching narrative revolves around the subject's journey towards improved mental well-being, with recurring themes of health, creativity, and achievement intertwined with challenges related to work and stress. The interplay between these themes highlights the subject's ongoing struggle to balance personal growth and external pressures, impacting their overall well-being.",
        "Emotional and Thematic Interrelation: Themes of health and achievement are often associated with positive emotions and a sense of accomplishment, while work-related themes trigger negative emotions and stress. This suggests a potential causative relationship between work-related stress and fluctuations in mood and overall mental state.",
        "Subtle Shifts in Mood and Tone: The journal entries demonstrate a shift from initial optimism and creative energy to feelings of overwhelm and negativity. This change coincides with the introduction of work-related stress as a prominent theme, indicating its significant impact on the subject's emotional state.",
        "Evolution of Self-Perception: Initially, the subject demonstrates a growing sense of self-efficacy through journaling and engaging in creative activities. However, work-related stress challenges this self-perception, leading to moments of doubt and self-criticism. This highlights the vulnerability of self-perception to external stressors.",
        "Predictive Insights on Mental Health: The observed patterns suggest a potential risk of developing chronic stress or anxiety if work-related stressors remain unaddressed. The subject's mood instability and vulnerability to negative thought patterns further emphasize the need for proactive intervention.",
        "Coping Strategy Effectiveness: Journaling and exercise appear to be somewhat effective in managing stress and promoting emotional well-being. However, the subject struggles to implement these strategies during periods of high stress. This suggests a need for exploring additional coping mechanisms, such as relaxation techniques or mindfulness exercises, to build resilience and better manage challenging situations."
    ];

    return (
        <div>
            <button className="logout-button" onClick={handleLogout}>Back</button>
            <div className="card">
                <h1>{`${user.firstName} ${user.lastName}'s Report`}</h1>
                <div className="chart-container">
                    <Pie data={pieData} />
                    <Line data={lineData} />
                </div>
                <h2>Periodic Trends</h2>
                <div>
                    {boxHeaders.map((header, index) => (
                        <div key={index} onClick={() => handleBoxClick(index)}>
                            <h3 className="scrolling-box-header">{header.split(":")[0]}</h3>
                            <p>{header.split(":")[1]}</p>
                        </div>
                    ))}
                </div>
                <h2>{user.firstName} {user.lastName}'s Daily Logs</h2>
                <Calendar onChange={handleDayClick} value={value} />
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={userId} theDate={selectedDay} />
        </div>
    );
}

export default Charts;
