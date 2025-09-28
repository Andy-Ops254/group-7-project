
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import { Link } from 'react-router-dom'
//helps us redirect after login

function LogInForm() {
    const navigate = useNavigate();

    const [logData, setLogData] = useState({
    name: "",
    email: "",
  });
  //then i usestate to store form inputs that is name and email

  function handleChange(e){
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });

  }
    function handleSubmit(e) {
    e.preventDefault(); // prevent page reload

    fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logData),
    })
      .then((res) => {
        if (res.status === 404) {
          navigate("/register");
          return;
        }
        if (!res.ok) {
          throw new Error("Invalid login");
        }
        return res.json();
      })
      .then((response) => {
        console.log("Login success:", response);
        navigate("/home"); // redirect to home
        setLogData({ name: "", email: "" });
      })
      .catch((err) => {
        console.error("❌ Login failed:", err.message);
      });

  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Welcome to the Mental Wellness App</h1>
      <p>
        Track your goals, log progress, and get support from others on your
        wellness journey.
      </p>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
        name ="name"
        type="text"
        placeholder="Name"
        value={logData.name}
        onChange ={handleChange}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}

        />
        {/*username input*/}

        <input
        name ="email"
        type ="text"
        placeholder="Email"
        value={logData.email}
        onChange={handleChange}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}

        />
        {/*email input*/}

        <button type="submit" style={{ padding: "8px 20px" }}>
            Log In</button>
        {/*submit button*/}


      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LogInForm;
