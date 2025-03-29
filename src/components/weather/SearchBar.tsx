import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="form-control mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher une ville..."
          className="input input-bordered w-full pr-16 input-lg shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="btn btn-primary absolute top-0 right-0 rounded-l-none h-full"
          onClick={handleSearch}
        >
          <Search className="mr-2" size={20} />
          Rechercher
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
