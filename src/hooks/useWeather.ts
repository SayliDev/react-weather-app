import { useState, useEffect } from "react";
import { City, WeatherData, ForecastDay } from "../types/weather";
import { OpenWeatherMapService } from "../services/weatherApi";

export function useWeather(apiKey: string) {
  const [weatherService, setWeatherService] = useState(
    new OpenWeatherMapService(apiKey)
  );
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    weatherService.setApiKey(apiKey);
  }, [apiKey, weatherService]);

  const searchCities = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await weatherService.searchCities(query);
      setSearchResults(results);
    } catch (err) {
      setError("Erreur lors de la recherche des villes");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectCity = async (city: City) => {
    setIsLoading(true);
    setError(null);
    setSelectedCity(city);

    try {
      const [weather, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city),
      ]);

      setCurrentWeather(weather);
      setForecast(forecastData);
    } catch (err) {
      setError("Erreur lors de la récupération des données météo");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectSuggestedCity = async (cityName: string) => {
    setIsLoading(true);

    try {
      const results = await weatherService.searchCities(cityName);
      if (results.length > 0) {
        await selectCity(results[0]);
      }
    } catch (err) {
      setError("Erreur lors de la sélection de la ville suggérée");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchResults,
    currentWeather,
    forecast,
    selectedCity,
    isLoading,
    error,
    searchCities,
    selectCity,
    selectSuggestedCity,
  };
}
