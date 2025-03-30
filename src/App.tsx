import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ApiConfig from "./components/weather/ApiConfig";
import ForecastCards from "./components/weather/ForecastCards";
import SearchBar from "./components/weather/SearchBar";
import SearchResults from "./components/weather/SearchResults";
import WeatherCard from "./components/weather/WeatherCard";
import { useApiKey } from "./hooks/useApiKey";
import { useWeather } from "./hooks/useWeather";

const App: React.FC = () => {
  const { apiKey, setApiKey } = useApiKey();

  const {
    searchResults,
    currentWeather,
    forecast,
    isLoading,
    error,
    searchCities,
    selectCity,
  } = useWeather(apiKey);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />

        <div className="card bg-base-100 shadow-2xl overflow-hidden">
          <div className="card-body p-6">
            <ApiConfig apiToken={apiKey} onApiTokenChange={setApiKey} />
            <SearchBar onSearch={searchCities} />

            {isLoading && <div className="text-center py-4">Chargement...</div>}

            {error && (
              <div className="alert alert-error my-4">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </div>
            )}

            <SearchResults results={searchResults} onCitySelect={selectCity} />

            <WeatherCard data={currentWeather} />

            <ForecastCards forecast={forecast} />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
