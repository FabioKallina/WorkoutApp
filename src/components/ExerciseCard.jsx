import React, { useState } from 'react'
import "../css/ExerciseCard.css"

const ExerciseCard = ({ exercise }) => {
    const [showInstructions, setShowInstructions] = useState(false);

    return (
        <div className="exercise-card">
            <h2>{exercise.name}</h2>
            <div className="exercise-info">
                <p><strong>Muscle:</strong> {exercise.muscle}</p>
                <p><strong>Type:</strong> {exercise.type}</p>
                <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
                <p><strong>Equipment:</strong> {exercise.equipment}</p>
            </div>
            <button onClick={() => setShowInstructions(!showInstructions)} className="instructions-btn">
                {showInstructions ? "-" : "?"}
            </button>
            {showInstructions && (
                <p className="instructions"> {exercise.instructions || "No instructions available"}</p>
            )}
        </div>
    )
}

export default ExerciseCard