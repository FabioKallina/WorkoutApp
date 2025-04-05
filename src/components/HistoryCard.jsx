import React from "react";
import "../css/HistoryCard.css";

const HistoryCard = () => {

  return (
    <div className="history-card-container">
      <div className="history-card-display">
        <h3>Morning Workout</h3>
        <h5>Wednesday, 2 Apr</h5>
        <h4>Exercise:</h4>
        <p>4 x Lateral Raise</p>
        <p>2 x Triceps Pushdown</p>
        <p> 3 x Triceps (Rope)</p>
        <p>3 x Preacher Curl</p>
        <p>2 x Incline Curl</p>
        <p>2 x Lateral Raise (Cable)</p>
      </div>
    </div>
  );
}

export default HistoryCard;