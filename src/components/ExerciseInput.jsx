
import "../css/ExerciseInput.css";
import { useState } from "react";

function ExerciseInput({ exercise, onRemove }) {

    const [showInstructions, setShowInstructions] = useState(false);
    const [sets, setSets] = useState([
        { id: Date.now(), weight: "", reps: "", completed: false }
    ]);
    const [showModal, setShowModal] = useState(false);

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
            { id: Date.now(), weight: "", reps: "", completed: false }
        ]);
    };


    return (
        <div className="input-card">

            <button className="instructions-info" onClick={() => setShowModal(true)}>?</button>

            <h2>{exercise.name}</h2>

            {sets.map((set, index) => (

                <div key={set.id} className={`setRow ${set.completed ? "Completed" : ""}`}>

                    <div className="input-pair">
                        <div className="input-group">
                            <label>Weight:</label>
                            <input
                                type="number"
                                value={set.weight}
                                onChange={(e) => handleChange(index, "weight", e.target.value)}
                            />

                        </div>

                        <div className="input-group">
                            <label>Reps:</label>
                            <input
                                type="number"
                                value={set.reps}
                                onChange={(e) => handleChange(index, "reps", e.target.value)}
                            />
                        </div>

                        <div className="button-group">
                            <button className="completed-button" onClick={() => handleConfirm(index)}>✔</button>
                            <button className="deleted-button" onClick={() => handleDeleteSet(index)}>✖</button>
                        </div>
                    </div>

                </div>
            ))}

            <button onClick={handleAddSets} className="add-set-button">
                + Add Set
            </button>

            <button className="remove-button" onClick={onRemove}>
                Remove
            </button>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Instructions</h3>
                        <p>{exercise.instructions || "No Instructions Available" }</p>
                        <button className="close-button" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )

}

export default ExerciseInput;