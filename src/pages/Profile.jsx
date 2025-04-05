import React from 'react'
import "../css/Profile.css"
import profilePic from "../images/default-profile.jpg"

const Profile = () => {
  return (
    <div className="profile-container">
        <div className="profile-display">
            <img src={profilePic}/>
            <h1>John Doe </h1>
            <p><strong>304 Workouts</strong></p>
        </div>
        <button className="login-btn">Log In</button>
    </div>
  )
}

export default Profile