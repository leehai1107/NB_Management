import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative flex-1 max-w-md">
      <input
        type="text"
        placeholder="Search records..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 pr-10 py-3.5 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
      />
      {searchTerm && (
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-indigo-600 px-2 py-1 transition-colors duration-200"
          onClick={() => onSearchChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
