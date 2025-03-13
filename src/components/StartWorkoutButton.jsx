
function StartWorkout() {

    function onStart(e) {
        e.preventDefault();
    }

    return (
        <button className="start-button" onClick={onStart}>Start Workout</button>
    );
}

export default StartWorkout;