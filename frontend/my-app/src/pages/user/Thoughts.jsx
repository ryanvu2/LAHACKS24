import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ThoughtBubble.css';
import { useNavigate } from 'react-router-dom';

const ThoughtBubble = () => {
    axios.defaults.baseURL = 'http://localhost:4000';
    const navigate = useNavigate();
    const { date } = useParams();
    const [text, setText] = useState('');
    const userId = "66240a210a2fda00fd163212";

    const formatDate = (dateStr) => {
        const [month, day] = dateStr.split('-').map(Number); // Convert 'MM-DD' to numbers
        const dateObj = new Date(new Date().getFullYear(), month - 1, day); // Months are 0-indexed in JS Date
        return dateObj;
    };

    const getFormattedDate = (dateStr) => {
        const dateObj = formatDate(dateStr);
        return dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    };
    

    useEffect(() => {
        const fetchText = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}/textAns/${date}`);
                setText(response.data.text);
            } catch (error) {
                console.error('Failed to fetch text:', error);
            }
        };

        fetchText();
    }, [date]);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSaveText = async () => {
        try {
            await axios.post(`/api/users/${userId}/textAns/${date}`, { text });
            console.log('Text updated successfully!');
        } catch (error) {
            console.error('Failed to update text:', error);
        }
        navigate('/calendar')
    };

    const handleSubmit = () => {
        console.log('Submit button clicked');
        try {
            axios.post(`/api/users/${userId}/textAns/${date}`, { text })
                 .then(response => {
                     console.log('Text updated successfully!');
                     navigate(`/questionnaire/${date}`); // Pass date to Questionnaire
                 });
        } catch (error) {
            console.error('Failed to update text:', error);
        }
    };

    return (
        <div className="thought-bubble-container">
            <h2 className="bubbleHeader">{getFormattedDate(date)}</h2>
            <div className="bubble small-bubble1"></div>
            <div className="bubble small-bubble2"></div>
            <div className="bubble big-bubble">
                <textarea
                    className="thought-textarea"
                    placeholder="How has your day been?"
                    value={text}
                    onChange={handleTextChange}
                ></textarea>
            </div>
            <div className="button-container">
                <button className="save-button" onClick={handleSaveText}>Save</button>
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default ThoughtBubble;
