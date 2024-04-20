import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  
import './ThoughtBubble.css';

const ThoughtBubble = () => {
    const { date } = useParams();
    const [text, setText] = useState('');
    const userId = "66240a210a2fda00fd163212";

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
    };

    return (
        <div className="thought-bubble-container">
            <h2 className="bubbleHeader">Entry for {date}</h2>
            <div className="bubble small-bubble1"></div>
            <div className="bubble small-bubble2"></div>
            <div className="bubble big-bubble">
                <textarea 
                    className="thought-textarea" 
                    placeholder="How has your day been?"
                    value={text}
                    onChange={handleTextChange}
                ></textarea>
                <button className="save-button" onClick={handleSaveText}>Save</button>
            </div>
        </div>
    );
};

export default ThoughtBubble;
