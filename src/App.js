import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentLogin from './components/StudentLogin';
import StudentLandingPage from './components/StudentLandingPage';
import ReviewerLandingPage from './components/ReviewerLandingPage';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<StudentLogin />} />
        
      <Route path="/student-landing" element={<StudentLandingPage />} />
        
      <Route path="/reviewer-landing" element={<ReviewerLandingPage />} /> 
                
      {/* <Route path="/admin" element={<AdminPage />} /> */}
       </Routes>
     </Router>
    
    
  );
}

export default App;

