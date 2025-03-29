// src/App.tsx
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ApiConfig from "./components/weather/ApiConfig";
import { useState } from "react";
import SearchBar from "./components/weather/SearchBar";
const App: React.FC = () => {
  const [apiToken, setApiToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const searchCities = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />

        <div className="card bg-base-100 shadow-2xl overflow-hidden">
          <div className="card-body p-6">
            <ApiConfig apiToken={apiToken} onApiTokenChange={setApiToken} />
            <SearchBar onSearch={searchCities} />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
