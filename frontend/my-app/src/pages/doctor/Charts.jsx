import React, {useState, useEffect} from 'react';
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
    const {userId} = useParams();
    console.log("id is:" + userId);
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

const preprocessOutput = (text) => {
    // const cleanedText = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    // return cleanedText.replace(/`/g, ''); // Remove backticks or other non-JSON characters
    let pattern = /```json\n{\n(.*?)\n}\n```/s;

    // Use match() to find the first match of the pattern in the input text
    let match = text.match(pattern);

    // If a match is found, extract the content inside "```json```"
    if (match) {
        let jsonContent = match[1];
        console.log(jsonContent);
        return jsonContent;
    } else {
        console.log("No match found.");
    }
    
};

const renderPeriodicContent = () => {
    if (!periodicData) {
        return <p>No data available.</p>;
    }

    if (typeof periodicData === 'string') {
        // Assume the string is JSON and parse it for better manipulation and display
        try {
            const dataObject = JSON.parse(periodicData);
            return formatDataAsText(dataObject);
        } catch (error) {
            // If parsing fails, display the raw string
            return <p>{preprocessOutput(periodicData)}</p>;
        }
    }

    // If periodicData is already an object, format it directly
    return formatDataAsText(preprocessOutput(periodicData));
};

const formatDataAsText = (dataObject) => {
    // Map object entries to formatted string, skip outermost braces if they exist
    let formattedContent = Object.entries(dataObject).map(([key, value]) => {
        let formattedValue = typeof value === 'string' ? value.replace(/\n/g, '\n    ') : JSON.stringify(value, null, 4);
        return `\n${key}:\n    ${formattedValue}`;
    }).join('\n\n');

    return <pre>{formattedContent}</pre>;
};

    

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
                    <div className="periodic-content">
                        {renderPeriodicContent()}
                    </div>
                <h2>{user.firstName} {user.lastName}'s Daily Logs</h2>
                <Calendar onChange={handleDayClick} value={value} />
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={userId} theDate={selectedDay} />
        </div>
    );
}

export default Charts;
