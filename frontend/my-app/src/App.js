import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyCalendar from './pages/user/HomePage';
import ThoughtBubble from './pages/user/Thoughts';
import SignInPage from './pages/SignIn'; // Assuming you have a SignInPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyCalendar />} />
        <Route path="/thought/:date" element={<ThoughtBubble />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
