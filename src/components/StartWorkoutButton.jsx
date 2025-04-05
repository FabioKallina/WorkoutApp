import React from 'react'

import "../css/StartButton.css"

const StartWorkoutButton = ({ onClick }) => {
  return (
    <button className="start-workout-btn" onClick={onClick}>
        Start Workout
    </button>
  )
}

export default StartWorkoutButton