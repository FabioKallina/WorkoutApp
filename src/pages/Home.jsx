import React, { useState, useEffect } from 'react'
import { searchExercise } from '../services/API'
import SearchBar from '../components/SearchBar'
import StartWorkoutButton from '../components/StartWorkoutButton'
import WorkoutPopup from '../components/WorkoutPopup'

import "../css/Exercises.css"
import ExerciseCard from '../components/ExerciseCard'

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultCategories = ["chest", "lats", "traps", "quadriceps", "hamstrings", "glutes", "biceps", "triceps", "shoulders", "abdominals",];

  useEffect(() => {

    async function fetchDefaultExercises() {
      setLoading(true);

      try {
        const defaultExercises = await searchExercise("chest");
        setExercises(defaultExercises);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch default exercises...");
      } finally {
        setLoading(false);
      }
    }

    fetchDefaultExercises();
  }, []);

  async function handleSearch(searchQuery) {
    if (!searchQuery) return;
    setSearchQuery(searchQuery);
    setLoading(true);

    try {
      const searchResults = await searchExercise(searchQuery, "name");
      setExercises(searchResults);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to search exercises...")
    } finally {
      setLoading(false);
    }
  }

  async function handleCategoryClick(category) {
    setSearchQuery(category);
    setLoading(true);

    try {
      const searchResults = await searchExercise(category, "muscle");
      setExercises(searchResults);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed fetching category exercises...");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="exercises-container">

      <div className="start-display">
        <StartWorkoutButton onClick={() => setIsPopupOpen(true)}/>
      </div>

      {isPopupOpen && <WorkoutPopup onClose={() => setIsPopupOpen(false)}/>}

      <SearchBar onSearch={handleSearch} />

      <div className="category-list">
        {defaultCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="category-button"
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="exercise-grid">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))
        ) : (
          <p>No Exercises found for this Category</p>
        )}
      </div>

      {loading && <p>Loading Exercises...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default Exercises