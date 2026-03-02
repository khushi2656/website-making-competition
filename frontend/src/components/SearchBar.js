import React, { useState } from 'react';

const SearchBar = ({ onSearch, onClear }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    onClear();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name, student ID, class, or section..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors text-sm"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
