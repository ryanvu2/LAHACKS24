import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css'; // Default styles first
import './HomePage.css'; // Your custom styles after

function MyCalendar() {
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleDateClick = (value) => {
    onChange(value);  // Update the selected date state
    const formattedDate = `${value.getMonth()+1}-${value.getDate()}`;  // Format date as "mm/dd"
    navigate(`/thought/${formattedDate}`);  // Navigate to ThoughtBubble page
  };

  return (
    <div className="calendar-container">
      <h1 class = "homeName">mindscape.ai</h1>
      <Calendar
        onChange={handleDateClick}
        value={value}
        className="custom-calendar"
      />
    </div>
  );
}

export default MyCalendar;
