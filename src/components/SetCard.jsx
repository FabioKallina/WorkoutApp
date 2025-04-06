import React, { useEffect, useState } from 'react'
import "../css/SetCard.css"

const SetCard = ({ exercise, onRemove, onUpdateSets }) => {
    const [sets, setSets] = useState([
        { id: Date.now(), weight: "", reps: "", completed: false }
    ]);

    const handleConfirmSet = (index) => {
        const updatedSets = [...sets];
        updatedSets[index].completed = !updatedSets[index].completed;
        setSets(updatedSets);
    }

    const handleDeleteSet = (index) => {
        const updatedSets = sets.filter((_, i) => i !== index);
        setSets(updatedSets);
    }

    const handleChange = (index, field, value) => {
        const updatedSets = [...sets];
        updatedSets[index][field] = value;
        setSets(updatedSets);
    }

    
    const handleAddSet = () => {
        setSets((prevSets) => [
            ...prevSets,
            { id: Date.now(), weight: "", reps: "", completed: false }
        ])


    }

    useEffect(() => {
        onUpdateSets && onUpdateSets(sets);
    }, [sets]);

    return (
        <div className="set-overlay">
            <h2>{exercise.name}</h2>

            {sets.map((set, index) => (
                <div key={set.id} className={`setRow ${set.completed ? "completed" : ""}`}>

                    <div className="input-pair">
                        <div className="set-number">
                            <h3>{index + 1}</h3>   
                        </div>  

                        <div className="input-group">
                            <label>lbs</label>
                            <input
                                type="number"
                                value={set.weight}
                                onChange={(e) => handleChange(index, "weight", e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label>Reps</label>
                            <input
                                type="number"
                                value={set.reps}
                                onChange={(e) => handleChange(index, "reps", e.target.value)}
                            />
                        </div>

                        <div className="button-container">
                            <button className="done" onClick={() => handleConfirmSet(index)}>✔</button>
                            <button className="cancel" onClick={() => handleDeleteSet(index)}>✗</button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="exercise-buttons-container">
                <button onClick={handleAddSet} className="add-set-button">
                    + Add Set
                </button>

                <button onClick={onRemove} className="remove-button">
                    Remove Exercise
                </button>
            </div>
        </div>
    )
}

export default SetCard