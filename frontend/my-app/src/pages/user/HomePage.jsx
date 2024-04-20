import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './HomePage.css';

function MyCalendar() {
  const [value, onChange] = useState(new Date()); // Stores the selected Date object
  const [currentDay, setCurrentDay] = useState(value.getDate()); // Day of the month
  const [currentMonth, setCurrentMonth] = useState(value.getMonth() + 1); // Month (1-12)

  // This function updates the calendar's value and also extracts and stores the month and day
  const handleDateChange = (newValue) => {
    onChange(newValue); // Update the selected date
    setCurrentDay(newValue.getDate()); // Update the day state
    setCurrentMonth(newValue.getMonth() + 1); // Update the month state (add 1 to month as getMonth() is 0 indexed)
  };

  return (
    <div className="calendar-container">
      <div className="custom-calendar-header">
        {/* Other header components */}
      </div>
      <Calendar
        onChange={handleDateChange} // Pass the new handler here
        value={value}
        className="custom-calendar"
      />
      {/* Other components such as the events list can be added here */}
      <p>Selected Date: {currentMonth}/{currentDay}</p> {/* Displaying month/day */}
    </div>
  );
}

export default MyCalendar;
