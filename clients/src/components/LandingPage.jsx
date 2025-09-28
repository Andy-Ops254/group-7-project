import React from "react";
import { Link } from 'react-router-dom'




function LandingPage() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Welcome to the Mental Wellness App</h1>
      <p>
        Track your goals, log progress, and get support from others on your
        wellness journey.
      </p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/login">LOG IN
          style={{
            marginRight: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "5px",
          }}
        </Link>
          
<Link></Link>

        
        
      </div>
    </div>
  );
}

export default LandingPage;
//here i create a landing page component with a welcome text
//and add signup and login links to landing page
