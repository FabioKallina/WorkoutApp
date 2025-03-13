
import "../css/ExerciseInput.css";
import { useState } from "react";

function ExerciseInput({ exercise, onRemove }) {

    const [showInstructions, setShowInstructions] = useState(false);
    const [sets, setSets] = useState([
        { id: Date.now(), weight: "", reps: "", completed: false}
    ]);

    const handleChange = (index, field, value) => {

        const updatedSets = [...sets];
        updatedSets[index][field] = value;
        setSets(updatedSets);
    }

    const handleConfirm = (index) => {

        const updatedSets = [...sets];
        updatedSets[index].completed = !updatedSets[index].completed;
        setSets(updatedSets);
    }

    const handleDeleteSet = (index) => {

        const updatedSets = sets.filter((_, i) => i !== index);
        setSets(updatedSets);
    }

    const handleAddSets = () => {

        setSets((prevSets) => [
            ...prevSets,
            { id: Date.now(), weight: "", reps: "", completed: false}
        ]);
    };

    return (
        <div className="input-card">
            <h2>{exercise.name}</h2>
            
            {sets.map((set, index) => (

                <div key={set.id} className={`setRow ${set.completed ? "Completed" : ""}`}>

                    <div className="label">
                        <label>Weight:</label>
                        <label>Reps:</label>
                    </div>

                    <div className="input-group">
                        <input 
                            type="number"
                            value={set.weight}
                            onChange={(e) => handleChange(index, "weight", e.target.value)}
                        />
                        <input 
                            type="number"
                            value={set.reps}
                            onChange={(e) => handleChange(index, "reps", e.target.value)}
                        />
                        <button onClick={() => handleConfirm(index)}>✔</button>
                        <button onClick={() => handleDeleteSet(index)}>✖</button>
                    </div>
                </div>
            ))}

            <button onClick={handleAddSets} className="add-set-button">
                + Add Set
            </button>

            <button onClick={() => setShowInstructions(!showInstructions)}>
                {showInstructions ? "Hide Instructions" : "Show Instructions"}
            </button>
            {showInstructions && (
                <div className="instructions">
                    <p>{exercise.instructions || "No Instructions Available"}</p>
                </div>
            )}
            <button className="remove-button" onClick={onRemove}>
                Remove
            </button>
        </div>
    )

}

export default ExerciseInput;