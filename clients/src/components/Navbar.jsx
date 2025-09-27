import React from 'react'
import { Link } from "react-router-dom";


function Navbar() {
    return (
    <header>
        <div>
        <h1>MENTAL WELLNESS</h1>
        </div>
        <nav>
            <Link to="/">LogIn</Link>
            <Link to="/home">Home</Link>
            <Link to="/goalform">Create goal</Link>
            <Link to="/logout">Log out</Link>

        </nav>
    </header>
    )
}

export default Navbar