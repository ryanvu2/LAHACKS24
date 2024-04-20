import React, { useState } from 'react';
import './questionaire.css'; // Make sure to import the CSS file

const questions = [
    { id: 1, text: "How many hours of sleep did you get in the past 24 hours?", inputType: "number" },
    { id: 2, text: "Did you take all prescribed medications today as directed?", inputType: "binary" },
    { id: 3, text: "How many meals did you consume today?", inputType: "number" },
    { id: 4, text: "How many minutes did you engage in physical activity today?", inputType: "number" },
    { id: 5, text: "On a scale from 1 to 10, how would you rate your stress level today?", inputType: "slider" },
    { id: 6, text: "On a scale from 1 to 10, how would you rate your mood stability today?", inputType: "slider" },
    { id: 7, text: "Did you experience any distressing symptoms today?", inputType: "binary", specify: true },
    { id: 8, text: "Did you consume any alcohol or controlled substances today?", inputType: "binary", specify: true }
];

function Questionnaire() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleInput = (key, value) => {
        setAnswers({ ...answers, [key]: value });
    };

    const handleNextQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const renderInputField = () => {
        const currentQuestion = questions[currentQuestionIndex];
        switch (currentQuestion.inputType) {
            case 'number':
                return <input type="number" value={answers[currentQuestion.id] || ''} onChange={(e) => handleInput(currentQuestion.id, e.target.value)} placeholder="Enter number" />;
            case 'slider':
                return (
                    <>
                        <input type="range" min="1" max="10" value={answers[currentQuestion.id] || 5} onChange={(e) => handleInput(currentQuestion.id, e.target.value)} />
                        <div>Rating: {answers[currentQuestion.id] || 5}</div>
                    </>
                );
            case 'binary':
                return (
                    <div>
                        <input type="radio" id={`${currentQuestion.id}-yes`} name={currentQuestion.id} value="Yes" checked={answers[currentQuestion.id] === 'Yes'} onChange={(e) => handleInput(currentQuestion.id, e.target.value)} />
                        <label htmlFor={`${currentQuestion.id}-yes`}>Yes</label>
                        <input type="radio" id={`${currentQuestion.id}-no`} name={currentQuestion.id} value="No" checked={answers[currentQuestion.id] === 'No'} onChange={(e) => handleInput(currentQuestion.id, e.target.value)} />
                        <label htmlFor={`${currentQuestion.id}-no`}>No</label>
                        {currentQuestion.specify && answers[currentQuestion.id] === 'Yes' && (
                            <input
                                type="text"
                                value={answers[`${currentQuestion.id}-specify`] || ''}
                                onChange={(e) => handleInput(`${currentQuestion.id}-specify`, e.target.value)}
                                placeholder="Please specify..."
                            />
                        )}
                    </div>
                );
            default:
                return <input type="text" value={answers[currentQuestion.id] || ''} onChange={(e) => handleInput(currentQuestion.id, e.target.value)} placeholder="Your answer here" />;
        }
    };

    return (
        <div className="questionnaire">
            {currentQuestionIndex < questions.length ? (
                <div className="question-container">
                    <p>{questions[currentQuestionIndex].text}</p>
                    {renderInputField()}
                    <button onClick={handleNextQuestion}>Next</button>
                </div>
            ) : (
                <div className="completion-message">
                    Thank you for completing the questionnaire!
                </div>
            )}
        </div>
    );
}

export default Questionnaire;
