import { useState } from 'react';
import "./searchbar.css"; // Importing the stylesheet for the search bar

export default function SearchBar({ onSearch }) {
  // Local state to store the search query input by the user
  const [query, setQuery] = useState('');

  // Function to handle the search action
  const handleSearch = () => {
    onSearch(query); // Call the parent component's search function with the current query
  };

  return (
    <div className="search-bar"> {/* Wrapper div for the search bar */}
      {/* Input field for typing search queries */}
      <input 
        type="text" 
        placeholder="Search articles..." // Placeholder text when input is empty
        className="search-input" // CSS class for styling the input field
        value={query} // Value of the input field bound to the query state
        onChange={(e) => {
          setQuery(e.target.value); // Update the query state when user types
        }}
      />
      {/* Search button */}
      <button 
        className="search-button" // CSS class for styling the button
        onClick={handleSearch} // Trigger the search when the button is clicked
      >
        Search
      </button>
    </div>
  );
}
