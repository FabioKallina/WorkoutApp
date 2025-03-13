
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Workout from "./pages/Workout";
import "./css/App.css"

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout" element={<Workout />} />
      </Routes>
      </main>
    </>
  );
}

export default App;