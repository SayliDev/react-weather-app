import { AlertCircle } from "lucide-react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ApiConfig from "./components/weather/ApiConfig";
import ForecastCards from "./components/weather/ForecastCards";
import SearchBar from "./components/weather/SearchBar";
import SearchResults from "./components/weather/SearchResults";
import WeatherCard from "./components/weather/WeatherCard";
import { useApiKey } from "./hooks/useApiKey";
import { useWeather } from "./hooks/useWeather";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-[rgba(255,241,198,0.41)] to-[rgb(188,210,219)]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />

        <div className="card bg-base-100 shadow-2xl overflow-hidden">
          <div className="card-body p-6 relative">
            <ApiConfig apiToken={apiKey} onApiTokenChange={setApiKey} />
            <SearchBar onSearch={searchCities} />

            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-white/50 backdrop-blur-sm flex justify-center items-center z-10"
                ></motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="alert alert-error my-4">
                <AlertCircle className="mr-2 text-red-600" />
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
