import React from "react";



function LandingPage() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Welcome to the Mental Wellness App</h1>
      <p>
        Track your goals, log progress, and get support from others on your
        wellness journey.
      </p>

      <div style={{ marginTop: "20px" }}>
        <a
          href="/signup"
          style={{
            marginRight: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "5px",
          }}
        >
          Sign Up
        </a>

        <a
          href="/login"
          style={{
            padding: "10px 20px",
            backgroundColor: "#008CBA",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Log In
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
//here i create a landing page component with a welcome text
//and add signup and login links to landing page
