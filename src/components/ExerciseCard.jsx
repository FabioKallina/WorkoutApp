
import "../css/Exercise.css";
import { useState } from "react";

function ExerciseCard({ exercise }) {

    const [showInstructions, setShowInstructions] = useState(false);

    return (
        <div className="exercise-card">
            <h2>{exercise.name}</h2>
            <p>Type: {exercise.type} </p>
            <p>Difficulty: {exercise.difficulty}</p>
            <button onClick={() => setShowInstructions(!showInstructions)}>
                {showInstructions ? "Hide Instructions" : "Show Instructions"}
            </button>
            {showInstructions && (
                <div className="instructions">
                    <p>{exercise.instructions || "No Instructions Available"}</p>
                </div>
            )}
        </div>
    );

}

export default ExerciseCard;