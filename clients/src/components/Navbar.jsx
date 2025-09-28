import React from 'react'
import { Link, useNavigate } from "react-router-dom";


function Navbar({onLogout}) {
    const navigate = useNavigate()

    //event listener for the logout button
    function handleLogout() {
        console.log("'exit")
        fetch("http://127.0.0.1:5555/logout", {
        method: "DELETE",
        credentials: "include"
        })
    .then(() => {
        onLogout();    
        navigate("/");        
    })
    .catch(err => {
        console.error("Logout failed:", err);
    });
}
    return (
    <header className="navbar">
        <div className="navbar-logo">
        <h1>MENTAL WELLNESS</h1>
        </div>
        <nav className="navbar-links">
            <Link className="nav-link" to="/">LogIn</Link>
            <Link className="nav-link" to="/home">Home</Link>
            <Link className="nav-link" to="/goalform">Create goal</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    </header>
    )
}


export default Navbar