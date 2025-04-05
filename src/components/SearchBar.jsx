import React, { useState } from 'react'
import "../css/SearchBar.css"

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input)
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        onSearch(value);
    }

  return (
    <div className="search-container">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input 
                type="text"
                placeholder="Search for an exercise..."
                className="search-input"
                value={input}
                onChange={handleChange}
            />
            <button type="submit" className="search-button">Search</button>
        </form>
    </div>
  )
}

export default SearchBar