// src/App.tsx
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ApiConfig from "./components/weather/ApiConfig";
import { useState } from "react";
import SearchBar from "./components/weather/SearchBar";
import SearchResults from "./components/weather/SearchResults";
import { City } from "./types/weather";

const App: React.FC = () => {
  const [apiToken, setApiToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([
    {
      name: "Paris",
      country: "FR",
      region: "Île-de-France",
      coordinates: {
        lat: 48.8566,
        lon: 2.3522,
      },
    },
    {
      name: "Lyon",
      country: "FR",
      region: "Auvergne-Rhône-Alpes",
      coordinates: {
        lat: 45.7578,
        lon: 4.832,
      },
    },
  ]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const searchCities = (query: string) => {
    setSearchQuery(query);
    // Simulation de recherche
    setSearchResults([
      {
        name: "Paris",
        country: "FR",
        region: "Île-de-France",
        coordinates: {
          lat: 48.8566,
          lon: 2.3522,
        },
      },
      {
        name: "Lyon",
        country: "FR",
        region: "Auvergne-Rhône-Alpes",
        coordinates: {
          lat: 45.7578,
          lon: 4.832,
        },
      },
    ]);
  };

  const selectCity = (city: City) => {
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />

        <div className="card bg-base-100 shadow-2xl overflow-hidden">
          <div className="card-body p-6">
            <ApiConfig apiToken={apiToken} onApiTokenChange={setApiToken} />
            <SearchBar onSearch={searchCities} />
            <SearchResults results={searchResults} onCitySelect={selectCity} />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
