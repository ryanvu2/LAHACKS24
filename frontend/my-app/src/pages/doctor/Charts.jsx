import React, {useState} from 'react';
import { Pie, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Charts.css'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styles first
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

function Charts() {
    const navigate = useNavigate();

    // Data for the pie chart
    const pieData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    // Data for the line graph
    const lineData1 = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Stress Levels',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56]
            }
        ]
    };

    const lineData2 = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Hours of Sleep',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56]
            }
        ]
    };

    const handleLogout = () => {
        // Perform any logout operations here, like clearing session data
        navigate('/DocHome');
    };

    const [value, onChange] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    const handleDayClick = (value) => {
        setSelectedDay(value);
        setIsModalOpen(true);
    };

    const boxHeaders = [
        'Integrated Thematic Analysis',
        'Emotional and Thematic Interrelation',
        'Subtle Shifts in Mood and Tone',
        'Evolution of Self-Perception',
        'Predictive Insights on Mental Health',
        'Coping Strategy Effectiveness'
    ];

    const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);
    const [activeBoxIndex, setActiveBoxIndex] = useState(null);

    const handleBoxClick = (index) => {
        setActiveBoxIndex(index);
        setIsBoxModalOpen(true);
    };

    const renderBoxModalContent = () => {
        if (activeBoxIndex === null) return 'No box selected';
        return `Information about Periodic Report ${activeBoxIndex + 1}`;
    };

    return (
        <div>
            <button className="logout-button" onClick={handleLogout}>Back</button>
            <div className="card">
                <h1 className="docHomeHeader">Client's Report</h1>
                <div className="chart-container">
                    <div>
                        <Pie data={pieData} />
                    </div>
                    <div>
                        <Line data={lineData1} />
                        <Line data={lineData2} />
                    </div>
                </div>
                <h2>Client's Daily Logs</h2>
                <div id="docCal" className="calendar-container">
                    <Calendar
                        onChange={handleDayClick}
                        value={value}
                        className="custom-calendar"
                    />
                </div>
                <h2>Periodic Trends</h2>
                <div className="scrolling-box-container">
                {boxHeaders.map((header, index) => (
                    <div key={index} className="scrolling-box" onClick={() => handleBoxClick(index)}>
                        <h3 className="scrolling-box-header">{header}</h3>
                    </div>
                ))}
            </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Details for {selectedDay?.toLocaleDateString()}</h2>
                {/* You can add more content here, such as the details or logs of the selected day */}
            </Modal>
            <Modal isOpen={isBoxModalOpen} onClose={() => setIsBoxModalOpen(false)}>
                <h2>{activeBoxIndex >= 0 ? boxHeaders[activeBoxIndex] : 'No Box Selected'}</h2>
                {/* You can add more content here, such as the details or logs of the selected box */}
            </Modal>
        </div>
    );
}

export default Charts;
