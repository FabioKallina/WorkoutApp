
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {

    return (
        <div className="navbar">
            <div className="navbar-brand">
                <Link to="/">Odyssey</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/workout" className="navbar-link">Workout</Link>
            </div>
        </div>
    );

}

export default Navbar;