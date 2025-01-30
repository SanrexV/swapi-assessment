import React, { useState, FormEvent } from "react";
import { Search } from "lucide-react";

type SearchBoxProps = {
  onSearch?: (query: string) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-md rounded-2xl shadow-lg overflow-hidden border border-gray-300 bg-white"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="flex-grow px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white text-white hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-100"
        >
          <Search color="black" className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
