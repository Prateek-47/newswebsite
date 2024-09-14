import { useState } from 'react';
import "./searchbar.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search articles..." 
        className="search-input"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
           // Trigger search on every input change
        }}
      />
      <button 
        className="search-button"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
