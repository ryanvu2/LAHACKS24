// Assuming this file is named Thoughts.jsx and located in src/pages/user
import React from 'react';
import './ThoughtBubble.css';  // Make sure this path is correct based on your project structure

const ThoughtBubble = () => {
  return (
    <div className="thought-bubble-container">
      <div className="bubble small-bubble1"></div>
      <div className="bubble small-bubble2"></div>
      <div className="bubble big-bubble">
        <textarea className="thought-textarea" placeholder="How has your day been?"></textarea>
      </div>
    </div>
  );
};

export default ThoughtBubble;
