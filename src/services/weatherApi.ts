import { City, ForecastDay, WeatherData } from "../types/weather";

interface OpenWeatherForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
  }>;
}

export interface WeatherApiService {
  searchCities: (query: string) => Promise<City[]>;
  getCurrentWeather: (city: City) => Promise<WeatherData>;
  getForecast: (city: City) => Promise<ForecastDay[]>;
}

export class OpenWeatherMapService implements WeatherApiService {
  private apiKey: string;
  private baseUrl = "https://api.openweathermap.org/data/2.5";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?q=London&appid=${this.apiKey}`
      );
      const data = await response.json();
      return data.cod !== 401;
    } catch {
      return false;
    }
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchCities(query: string): Promise<City[]> {
    const response = await fetch(
      `${this.baseUrl}/weather?q=${query}&appid=${this.apiKey}&lang=fr`
    );
    const data = await response.json();

    if (data.cod === "404") {
      return [];
    }

    // Info via reverse geocoding
    const reverseResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${data.coord.lat}&lon=${data.coord.lon}&limit=1&appid=${this.apiKey}`
    );
    const reverseData = await reverseResponse.json();
    console.log(reverseData);
    const region = reverseData[0]?.state || data.name;

    return [
      {
        name: data.name,
        country: data.sys.country,
        region: region,
        coordinates: {
          lat: data.coord.lat,
          lon: data.coord.lon,
        },
      },
    ];
  }

  async getCurrentWeather(city: City): Promise<WeatherData> {
    const response = await fetch(
      `${this.baseUrl}/weather?q=${city.name}&appid=${this.apiKey}&lang=fr`
    );
    const data = await response.json();
    // console.log(data);

    // Info via reverse geocoding
    const reverseResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${data.coord.lat}&lon=${data.coord.lon}&limit=1&appid=${this.apiKey}`
    );
    const reverseData = await reverseResponse.json();
    const region = reverseData[0]?.state || data.name;

    // données de l'API en format WeatherData
    return {
      city: {
        name: data.name,
        country: data.sys.country,
        region: region,
        coordinates: {
          lat: data.coord.lat,
          lon: data.coord.lon,
        },
      },
      temperature: Math.round(data.main.temp - 273.15),
      condition: data.weather[0].description,
      windSpeed: Math.round(data.wind.speed),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      lastUpdated: new Date(data.dt * 1000).toLocaleString("fr-FR"),
      icon: data.weather[0].icon,
    };
  }

  async getForecast(city: City): Promise<ForecastDay[]> {
    const response = await fetch(
      `${this.baseUrl}/forecast?q=${city.name}&appid=${this.apiKey}&lang=fr`
    );
    const data = await response.json();
    console.log("data", data);

    // prévision par jour toutes les 8 heures
    const dailyForecasts = data.list.filter(
      (_: OpenWeatherForecastItem, index: number) => index % 8 === 0
    );

    return dailyForecasts.map((item: OpenWeatherForecastItem) => ({
      day: new Date(item.dt * 1000).toLocaleDateString("fr-FR", {
        weekday: "long",
      }),
      temperature: Math.round(item.main.temp - 273.15),
      icon: item.weather[0].icon,
    }));
  }
}
