export interface City {
  name: string;
  country: string;
  region: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

export interface WeatherData {
  city: City;
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
  pressure: number;
  lastUpdated: string;
  icon: string;
}

export interface ForecastDay {
  day: string;
  temperature: number;
  icon: string;
}
