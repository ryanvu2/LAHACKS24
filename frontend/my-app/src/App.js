import logo from './logo.svg';
import './App.css';
import DocHome from './pages/doctor/HomePage'
import SignInPage from './pages/SignIn'
import MyCalendar from './pages/user/HomePage'
import ThoughtBubble from './pages/user/Thoughts'

import Questionnaire from './pages/user/questionaire';
function App() {
  return (
    //<MyCalendar/>
    // <ThoughtBubble/>
    <Questionnaire />
    <DocHome/>


  );
}

export default App;
