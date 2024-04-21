import React, { useState } from 'react';
import './Questions.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams

function Questionnaire() {
    const { date } = useParams(); // Get date from URL parameters
    const navigate = useNavigate();
    const userID = "66240a210a2fda00fd163212";

    const questions = [
        { id: 'sleep', text: "How many hours of sleep did you get in the past 24 hours?", inputType: "number" },
        { id: 'meds', text: "Did you take all prescribed medications today as directed?", inputType: "binary" },
        { id: 'meals', text: "How many meals did you consume today?", inputType: "number" },
        { id: 'fitMin', text: "How many minutes did you engage in physical activity today?", inputType: "number" },
        { id: 'stress', text: "On a scale from 1 to 10, how would you rate your stress level today?", inputType: "slider" },
        { id: 'moodStab', text: "On a scale from 1 to 10, how would you rate your mood stability today?", inputType: "slider" },
        { id: 'distress', text: "Did you experience any distressing symptoms today?", inputType: "binary", specify: true },
        { id: 'substance', text: "Did you consume any alcohol or controlled substances today?", inputType: "binary", specify: true }
    ];

    const initialAnswers = questions.reduce((acc, question) => ({
        ...acc,
        [question.id]: question.inputType === 'binary' ? '' : (question.inputType === 'slider' ? 5 : 0)
    }), {});

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(initialAnswers);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleInput = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(current => current + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        console.log(`Submitting to: http://localhost:4000/api/users/${userID}/questAns/${date}`);
        try {
            const response = await axios.patch(`http://localhost:4000/api/users/${userID}/questAns/${date}`, { answers });
            console.log('Success:', response.data);
            setIsCompleted(true);
        } catch (error) {
            console.error('Error submitting:', error.response ? error.response.data : error.message);
        }
        console.log('Submitting Answers:', answers);
        navigate('/calendar');
    };

    const renderInputField = () => {
        const currentQuestion = questions[currentQuestionIndex];
        switch (currentQuestion.inputType) {
            case 'number':
                return <input type="number" value={answers[currentQuestion.id] || ''} onChange={(e) => handleInput(currentQuestion.id, e.target.value)} placeholder="Enter number" />;
            case 'slider':
                return (
                    <>
                        <input type="range" min="1" max="10" value={answers[currentQuestion.id]} onChange={(e) => handleInput(currentQuestion.id, e.target.value)} />
                        <div>Rating: {answers[currentQuestion.id]}</div>
                    </>
                );
            case 'binary':
                return (
                    <div>
                        <input type="radio" id={`${currentQuestion.id}-yes`} name={`question-${currentQuestion.id}`} value="Yes" checked={answers[currentQuestion.id] === 'Yes'} onChange={(e) => handleInput(currentQuestion.id, 'Yes')} />
                        <label htmlFor={`${currentQuestion.id}-yes`}>Yes</label>
                        <input type="radio" id={`${currentQuestion.id}-no`} name={`question-${currentQuestion.id}`} value="No" checked={answers[currentQuestion.id] === 'No'} onChange={(e) => handleInput(currentQuestion.id, 'No')} />
                        <label htmlFor={`${currentQuestion.id}-no`}>No</label>
                        {currentQuestion.specify && answers[currentQuestion.id] === 'Yes' && (
                            <input type="text" value={answers[`${currentQuestion.id}-specify`] || ''} onChange={(e) => handleInput(`${currentQuestion.id}-specify`, e.target.value)} placeholder="Please specify..." />
                        )}
                    </div>
                );
        }
    };

    return (
        <div className="questionnaire">
            {!isCompleted ? (
                <div className="question-container">
                    <p>{questions[currentQuestionIndex].text}</p>
                    {renderInputField()}
                    <button onClick={handleNextQuestion}>{currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}</button>
                </div>
            ) : (
                <div className="completion-message">
                    Thank you for completing the questionnaire!
                    <button className="completion-button" onClick={() => navigate('/')}>Go Back</button>
                </div>
            )}
        </div>
    );
}

export default Questionnaire;
