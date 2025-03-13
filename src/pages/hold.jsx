
import { useState } from "react";
import "../css/Workout.css";
import { searchExercises } from "../services/API";
import StartWorkout from "../components/StartWorkoutButton";
import ExerciseCard from "../components/ExerciseCard";

function Workout4() {

    const [workoutStarted, setWorkoutStarted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [exercises, setExercises] = useState([]);
    const [addedExercises, setAddedExercises] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleStartWorkout() {
        setWorkoutStarted(true);
    }

    async function handleSearch(e) {

        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {

            const results = await searchExercises(searchQuery);
            setExercises(results);
            setError(null);

        }
        catch (err) {

            console.error(err);
            setError("Failed to search exercise...");

        }
        finally {

            setLoading(false);

        }
    }

    function handleAddExercise(exercise) {
        if (!addedExercises.find((ex) => ex.name === exercise.name)) {
            setAddedExercises((prev) => [...prev, exercise])
        }
    }

    function handleRemoveExercise(name) {
        setAddedExercises((prev) => prev.filter((ex) => ex.name !== name))
    }

    return (
        <div className="workout-page">
            {!workoutStarted ? (
                <button onClick={handleStartWorkout} className="start-button">
                    Start Workout
                </button>
            ) : (
                <>
                <form onSubmit={handleSearch} className="search-form">
                    <input 
                        type="text"
                        placeholder="Search for an exercise..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>

                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}

                <div className="exercise-list">
                    {exercises.map((exercise) => (
                        <div key={exercise.name} className="exercise-item">
                            <ExerciseCard exercise={exercise} />
                            <button onClick={() => handleAddExercise(exercise)}>
                                + Add
                            </button>
                        </div>
                    ))}
                </div>

                <h3>Exercises: </h3>
                {addedExercises.length > 0 ? (
                    addedExercises.map((exercise) => (
                        <div key={exercise.name} className="added-exercise">
                            <p>{exercise.name}</p>
                            <button onClick={() => handleRemoveExercise(exercise.name)}>Remove</button>
                        </div>
                    ))
                ) : (
                    <p>No exercises added yet.</p>
                )}

                </>
                
            )}
        </div>
    );
}

export default Workout4;