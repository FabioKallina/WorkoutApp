import React from 'react'
import { Link } from 'react-router-dom'

import "../css/Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar-links">
            <Link to="/profile" className="navbar-link">Profile</Link>
            <Link to="/" className="navbar-link" href="#Home">Start Workout</Link>
            <Link to="/history" className="navbar-link">History</Link>
        </div>
    </div>
  )
}

export default Navbar