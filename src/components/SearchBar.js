import React from "react";

const SearchBar = ({ search, setSearch }) => (
  <input
    type="text"
    placeholder="Search by first or last name"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="mb-4 p-2 border rounded w-full"
  />
);

export default SearchBar;