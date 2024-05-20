import React from "react";

interface SearchBarProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddNewStudent: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  handleSearchChange,
  handleAddNewStudent,
}) => (
  <div className="search-cont">
    <div className="search-cont-h2">
      <h2>Students</h2>
    </div>
    <div className="search-btn">
      <input
        className="search-bar"
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button className="add-new-btn" onClick={handleAddNewStudent}>
        ADD NEW STUDENT
      </button>
    </div>
  </div>
);

export default SearchBar;
