import { useState } from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ApiConfig from "./components/weather/ApiConfig";
import SearchBar from "./components/weather/SearchBar";
import SearchResults from "./components/weather/SearchResults";
import WeatherCard from "./components/weather/WeatherCard";
import { City, WeatherData } from "./types/weather";

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
  const [weatherData, setWeatherData] = useState<WeatherData>({
    city: {
      name: "Paris",
      country: "FR",
      region: "Île-de-France",
      coordinates: {
        lat: 48.8566,
        lon: 2.3522,
      },
    },
    temperature: 22,
    condition: "Ensoleillé",
    windSpeed: 12,
    humidity: 65,
    pressure: 1015,
    lastUpdated: new Date().toLocaleString(),
    icon: "☀️",
  });

  const searchCities = (query: string) => {
    setSearchQuery(query);
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
    setWeatherData({
      ...weatherData,
      city: city,
      lastUpdated: new Date().toLocaleString(),
    });
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
            <WeatherCard data={weatherData} />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
