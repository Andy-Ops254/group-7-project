import React from "react";
import { Link } from 'react-router-dom'




function LandingPage() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to the Mental Wellness App</h1>
      <p className="landing-text">
        Track your goals, log progress, and get support from others on your
        wellness journey.
      </p>

      <div className="landing-buttons">
        <Link to="/login"className="primary-btn">
        Log In
        </Link>   
        <Link to="/register" className="secondary-btn">
        Sign Up
        </Link>

        
        
      </div>
    </div>
  );
}

export default LandingPage;
//here i create a landing page component with a welcome text
//and add signup and login links to landing page
