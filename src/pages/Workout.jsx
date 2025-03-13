
import { useState } from "react";
import "../css/Workout.css";
import { searchExercises } from "../services/API";
import StartWorkout from "../components/StartWorkoutButton";

function Workout() {

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

    return (
        <div className="workout-page">
            <h2>No Exercises Added Yet</h2>
            <StartWorkout />
        </div>
    );
}

export default Workout;