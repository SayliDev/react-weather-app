import { useState, useEffect } from "react";

const API_KEY_STORAGE_KEY = "weather_app_api_key";

export function useApiKey() {
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem(API_KEY_STORAGE_KEY) || "";
  });

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    } else {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    }
  }, [apiKey]);

  return { apiKey, setApiKey };
}
