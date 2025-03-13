
import { useState, useEffect } from "react";
import { searchExercises } from "../services/API";
import ExerciseCard from "../components/ExerciseCard";
import "../css/Home.css"

function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const defaultCategories = ["chest", "lats", "traps", "quadriceps", "hamstrings", "glutes", "biceps", "triceps", "shoulders", "abdominals", ];

    useEffect(() => {

        async function fetchDefaultExercises() {
            setLoading(true);

            try {
                const defaultExercises = await searchExercises("chest");
                setExercises(defaultExercises);
                setError(null);
            }
            catch (err) {
                console.error(err);
                setError("Failed to fetch exercises...")
            } finally {
                setLoading(false);
            }
        }

        fetchDefaultExercises();
    }, []);

    async function handleSearch(e) {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchExercises(searchQuery, "name");
            console.log(searchResults);
            setExercises(searchResults);
            setError(null)
        }
        catch (err) {
            console.log(err)
            setError("Failed to search exercises...")
        }
        finally {
            setLoading(false)
        }
    };

    async function handleCategoryClick(category) {
        setSearchQuery(category);
        setLoading(true);

        try {
            const searchResults = await searchExercises(category, "muscle");
            setExercises(searchResults);
            setError(null);
        }
        catch (err) {
            console.error(err);
            setError("Failed to fetch exercises...")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text"
                    placeholder="Search for an exercise..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" type="submit">Search</button>
            </form>

            <div className="category-list">
                {defaultCategories.map((category) => {
                    return (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="category-button"
                    >
                        {category.toUpperCase()}
                    </button>
                    );
                })}
            </div>

             <div className="exercise-grid">
                {exercises.length > 0 ? (
                    exercises.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))
                ) : (
                    <p>No exercises found for this category.</p>
                )}
            </div>

            {loading && <p>Loading Exercises...</p>}
            {error && <p className="error">{error}</p>}
            
        </div>
    );
}

export default Home;