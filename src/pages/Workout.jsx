import { useState } from "react";
import { searchExercises } from "../services/API";
import StartWorkoutButton from "../components/StartWorkoutButton";
import ExerciseInput from "../components/ExerciseInput";
import "../css/Workout.css";

function Workout() {

    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [workoutStarted, setWorkoutStarted] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [addedExercises, setAddedExercises] = useState([]);
    const [error, setError] = useState(null);

    const handleStartWorkout = () => {
        console.log("Start workout button clicked");
        setShowSearch(false);
        setWorkoutStarted(true);
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            const results = await searchExercises(query);
            setSearchResults(results);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch exercises...");
        }
    };

    const handleAddExercise = (exercise) => {
        if (!addedExercises.some((ex) => ex.name === exercise.name)) {
            setAddedExercises((prev) => [...prev, exercise]);
            setSearchResults([]);
            setSearchQuery("");
            setShowSearch(false);
        }
    };

    const handleRemoveExercise = (id) => {
        setAddedExercises((prevExercises) => 
            prevExercises.filter((exercise) => exercise.id !== id)
        );
    };

    return (
        <div className="workout-page">
            <h2>{addedExercises.length > 0 ? "Your Workout" : "No Exercises Added Yet"}</h2>

            {/* Start Workout Button */}
            {!workoutStarted && (
                <StartWorkoutButton onClick={handleStartWorkout} />
            )}

            {workoutStarted && !showSearch && (
                <button
                    onClick={() => setShowSearch(true)}
                    className="add-exercise-button"
                >
                    + Add Exercise
                </button>
            )}

            {/* Search Form */}
            {showSearch && (
                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Search for an exercise..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-input"
                    />
                    <div className="search-results">
                        {searchResults.map((exercise) => (
                            <div key={exercise.id} className="search-result-item">
                                <span>{exercise.name}</span>
                                <button onClick={() => handleAddExercise(exercise)}>Add</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Display Added Exercises */}
            <div className="exercise-list">
                {addedExercises.map((exercise) => (
                    <ExerciseInput 
                        key={exercise.name} 
                        exercise={exercise} 
                        onRemove={() => handleRemoveExercise(exercise.id)}
                    />
                ))}
            </div>

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Workout;
