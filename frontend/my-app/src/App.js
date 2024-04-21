import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DocHome from './pages/doctor/HomePage';
import SignInPage from './pages/SignIn';
import MyCalendar from './pages/user/HomePage';
import ThoughtBubble from './pages/user/Thoughts';
import Charts from './pages/doctor/Charts';
import Questionnaire from './pages/user/Questions';
import SignUp from './pages/SignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/thought/:date" element={<ThoughtBubble />} />
        <Route path="/doctor" element={<DocHome />} />
        {/* <Route path="/" element={<SignInPage />} /> */}
        <Route path = "/DocHome" element = {<DocHome/>}/>
        <Route path ="/signup" element = {<SignUp/>}/>
        <Route path="/charts" element={<Charts />} />
        <Route path="/questionnaire/:date" element={<Questionnaire />} />

      </Routes>
    </Router>
  );
}

export default App;
