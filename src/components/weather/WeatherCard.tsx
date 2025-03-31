import { WeatherData } from "../../types/weather";
import { MapPin, Wind, Droplets, Gauge } from "lucide-react";
import {
  getTemperatureGradient,
  getTemperatureColor,
  getWeatherIcon,
} from "../../utils/weatherUtils.tsx";

interface WeatherCardProps {
  data: WeatherData | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div
      className={`rounded-box ${getTemperatureGradient(data.temperature)} p-1`}
    >
      <div className="bg-base-100 bg-opacity-80 rounded-box p-6 weather-card">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center mb-2">
              <MapPin
                className={`${getTemperatureColor(data.temperature)} mr-2`}
                size={20}
              />
              <h2 className="text-2xl font-bold">
                {data.city.name}, {data.city.country}
              </h2>
            </div>
            <div className="text-gray-500 mb-2">{data.city.region}</div>
            {data.city.coordinates && (
              <div className="badge badge-outline badge-neutral opacity-50 mb-2">
                Coordonnées: {data.city.coordinates.lat}° N,{" "}
                {data.city.coordinates.lon}° E
              </div>
            )}
            <div className="text-sm text-gray-500">
              Dernière mise à jour: {data.lastUpdated}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`text-6xl font-bold ${getTemperatureColor(
                data.temperature
              )} flex items-center`}
            >
              {getWeatherIcon(data.icon)}
              {data.temperature}°C
            </div>
            <div className="text-lg mt-2 capitalize">{data.condition}</div>
            <div className="flex gap-4 mt-4">
              <div className="flex flex-col items-center">
                <Wind className="text-blue-400 mb-1" size={20} />
                <span>{data.windSpeed} km/h</span>
              </div>
              <div className="flex flex-col items-center">
                <Droplets className="text-blue-500 mb-1" size={20} />
                <span>{data.humidity}%</span>
              </div>
              <div className="flex flex-col items-center">
                <Gauge className="text-purple-500 mb-1" size={20} />
                <span>{data.pressure} hPa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
