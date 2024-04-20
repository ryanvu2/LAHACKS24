import React from 'react';
import {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styles first
import './HomePage.css'; // Your custom styles after

function MyCalendar(){
  const [value, onChange] = useState(new Date());

  return (
    <div className="calendar-container">
      <div className="custom-calendar-header">
        {/* Other header components */}
      </div>
      <Calendar
        onChange={onChange}
        value={value}
        className="custom-calendar"
      />
      {/* Other components such as the events list can be added here */}
    </div>
  );
}

export default MyCalendar;
