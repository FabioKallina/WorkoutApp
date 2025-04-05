import React, { useState, useEffect } from 'react'
import "../css/History.css"

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("workoutHistory")) || [];
    setHistory(storedHistory);
  }, [])
  return (
    <div className="history-page">
      <h2>Workout History:</h2>

      {history.map((workout, index) => (
        <div key={index} className="history-card">
          <h3>{new Date(workout.date).toLocaleDateString()} - {formatTime(workout.timeElapsed)}</h3>

          {workout.exercises.map((ex, i) => (
            <div key={i} className="history-info">
              <strong>{ex.name}</strong>
                {ex.sets.map((set, j) => (
                  <p key={j}>{set.reps} reps @ {set.weight}lbs</p>
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default History