"use client";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="flex items-center ">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className="border border-a rounded-lg  h-[30px] pl-2"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <BiSearch className="-ml-[1.25em] text-primary-color" />
    </div>
  );
};

export default SearchBar;
