import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DocHome from './pages/doctor/HomePage';
import SignInPage from './pages/SignIn';
import MyCalendar from './pages/user/HomePage';
import ThoughtBubble from './pages/user/Thoughts';
import Charts from './pages/doctor/Charts';
import Questionnaire from './pages/user/Questions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyCalendar />} />
        <Route path="/thought/:date" element={<ThoughtBubble />} />
        <Route path="/doctor" element={<DocHome />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
      </Routes>
    </Router>
  );
}

export default App;
