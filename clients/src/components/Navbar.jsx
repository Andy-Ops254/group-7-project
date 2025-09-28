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
    <header>
        <div>
        <h1>MENTAL WELLNESS</h1>
        </div>
        <nav>
            <Link to="/">LogIn</Link>
            <Link to="/home">Home</Link>
            <Link to="/goalform">Create goal</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    </header>
    )
}


export default Navbar