
function StartWorkout() {

    function onStart(e) {
        e.preventDefault();
    }

    return (
        <button className="start-button" onClick={onStart}>Start Workout</button>
    );
}

function Workout() {

    return (
        <div className="workout-page">
            <h2>No Exercises Added Yet</h2>
            <StartWorkout />
        </div>
    );
}

export default Workout;