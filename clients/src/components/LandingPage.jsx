import React from "react";
import { Link } from 'react-router-dom'


function LandingPage() {
  return (

    <div className="container" style={{ textAlign: "center", padding: "40px" }}>
      <h1>Welcome to the Mental Wellness App</h1>
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1 style={{ color: "#6a4dad" }}>Welcome to the Mental Wellness App</h1>
      <p>
        Track your goals, log progress, and get support from others on your
        wellness journey.
      </p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/login" className="primary" style={{ marginRight: "20px" }}>
        LOG IN
        </Link>
          
        <Link to="/register" className="secondary">
        SIGN UP
        </Link>

      </div>
    </div>
    </div>
  );
}

export default LandingPage;
//here i create a landing page component with a welcome text
//and add signup and login links to landing page
