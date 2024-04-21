import React, {useState, useEffect} from 'react';
import { Pie, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Charts.css'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styles first
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Charts() {
    const navigate = useNavigate();
    const {userId} = useParams();
    console.log("id is:" + userId);
    const [user, setUser] = useState({ firstName: '', lastName: '' });
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:4000/api/users/${userId}`);
                setUser(userResponse.data);
                
                // Assuming the API provides an endpoint to fetch user-specific chart data
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchUserData();
    }, [userId]);
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    const handleDayClick = (value) => {
        onChange(value);  // Update the selected date state
        const formattedDate = `${value.getMonth()+1}-${value.getDate()}`;  // Format date as "mm/dd"
        console.log(formattedDate);
        setSelectedDay(formattedDate);
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <button className="logout-button" onClick={handleLogout}>Back</button>
            <div className="card">
                <h1 className="docHomeHeader">{user.firstName} {user.lastName}'s Report</h1>
                <div className="chart-container">
                    <Pie data={pieData} />
                    <Line data={lineData1} />
                </div>
                <h2>{user.firstName} {user.lastName}'s Daily Logs</h2>
                <Calendar onChange={handleDayClick} value={value} className="custom-calendar" />
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={userId} theDate={selectedDay}>
                <h2>Details for {selectedDay}</h2>
            </Modal>
        </div>
    );
}

export default Charts;
