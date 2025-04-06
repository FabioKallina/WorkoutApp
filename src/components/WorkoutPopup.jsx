import React, { useEffect, useRef, useState } from "react";
import { searchExercise } from "../services/API"
import "../css/WorkoutPopup.css";
import SearchBar from "./SearchBar";
import SetCard from "./SetCard";

const WorkoutPopup = ({ onClose }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addedExercises, setAddedExercises] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [workoutSummary, setWorkoutSummary] = useState([]);
  const [workoutDate, setWorkoutDate] = useState(null);

  const [error, setError] = useState(null);

  const timeRef = useRef(null);

  useEffect(() => {
    timeRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000) //updates every second

    return () => clearInterval(timeRef.current);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchExercise(query);
      setSearchResults(results);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch exercises...");
    }
  };

  const handleAddExercise = (exercise) => {
    if (!addedExercises.some((ex) => ex.name === exercise.name)) {

      const newExercise = {
        ...exercise,
        id: crypto.randomUUID(),
      }
      setAddedExercises((prev) => [...prev, newExercise]);
      setSearchResults([]);
      setSearchQuery("");
      setShowSearch(false);
    }
  }

  const handleRemoveExercise = (id) => {
    setAddedExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== id)
    );
  };

  const handleFinishWorkout = () => {
    clearInterval(timeRef.current);
    setWorkoutFinished(true);

    const now = new Date()
    setWorkoutDate(now);

    const summary = addedExercises.map((exercise) => ({
      name: exercise.name,
      sets: exercise.sets || []
    }));

    setWorkoutSummary(summary);

    const workoutData = {
      date: now.toISOString(),
      timeElapsed,
      exercises: summary,
    }

    const prevHistory = JSON.parse(localStorage.getItem("workoutHistory")) || [];
    const updatedHistory = [workoutData, ...prevHistory];
    localStorage.setItem("workoutHistory", JSON.stringify(updatedHistory));
  }

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short"
    })
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Workout Started</h2>
        <button className="timer-button">{formatTime(timeElapsed)}</button>
        <button className="finish-button" onClick={handleFinishWorkout}>Finish</button>
        <p>Select your exercises and begin!</p>

        <div className="exercise-list">
          {addedExercises.map((exercise) => (
            <SetCard
              key={exercise.id}
              exercise={exercise}
              onRemove={() => handleRemoveExercise(exercise.id)}
              onUpdateSets={(sets) => {
                setAddedExercises((prev) =>
                  prev.map((ex) =>
                    ex.id === exercise.id ? { ...ex, sets } : ex
                  )
                )
              }}
            />
          ))}
        </div>

        {showSearch && (
          <div className="search-display">
            <SearchBar onSearch={handleSearch} />

            <div className="search-results">
              {searchResults.map((exercise) => (
                <div key={exercise.id} className="search-result-item" >
                  <span>{exercise.name}</span>
                  <button onClick={() => handleAddExercise(exercise)}>+ Add</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="add-exercise-btn" onClick={() => setShowSearch(true)}>Add Exercise</button>

        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>

      {workoutFinished && (
        <div className="summary-overlay">
          <div className="summary-card">
            <h2>Workout Summary</h2>
            <p className="summary-time">Total Time: {formatTime(timeElapsed)}, {formatDate(workoutDate)}</p>

            <div className="summary-exercises">
              {workoutSummary.map((exercise, index) => (
                <div key={index} className="summary-exercise">
                  <h4>{exercise.name}</h4>
                  {exercise.sets.map((set, i) => (
                    <p key={i}>
                      Set {i + 1}: {set.weight} lbs x {set.reps} reps
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <button className="summary-close" onClick={onClose}>Close</button>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

    </div>


  );
};

export default WorkoutPopup;