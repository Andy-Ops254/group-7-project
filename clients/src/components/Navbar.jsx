import React from 'react'
import { Link } from "react-router-dom";


function Navbar() {
    return (
    <header>
        <div>
        <h1>MENTAL WELLNESS</h1>
        </div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">LogIn</Link>
            <Link to="/community">Community</Link>
        </nav>
    </header>
    )
}

export default Navbar