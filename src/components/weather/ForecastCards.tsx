import { Cloud, CloudDrizzle, CloudRain, CloudSun, Sun } from "lucide-react";
import { ForecastDay } from "../../types/weather";

interface ForecastCardsProps {
  forecast: ForecastDay[];
}

const ForecastCards: React.FC<ForecastCardsProps> = ({ forecast }) => {
  if (forecast.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-6">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="card bg-base-100 shadow p-3 flex flex-col items-center"
        >
          <div className="text-sm font-medium capitalize">{day.day}</div>
          {getWeatherIcon(day.icon)}
          <div className="font-bold">{day.temperature}°C</div>
        </div>
      ))}
    </div>
  );
};

function getWeatherIcon(icon: string) {
  const iconProps = {
    size: 24,
    className: `my-2 ${getIconColorClass(icon)}`,
  };

  // OpenWeatherMap icon codes
  switch (icon) {
    case "01d":
    case "01n":
      return <Sun {...iconProps} />;
    case "02d":
    case "02n":
      return <CloudSun {...iconProps} />;
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return <Cloud {...iconProps} />;
    case "10d":
    case "10n":
      return <CloudRain {...iconProps} />;
    case "09d":
    case "09n":
      return <CloudDrizzle {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
}

function getIconColorClass(icon: string): string {
  // OpenWeatherMap icon codes
  switch (icon) {
    case "01d":
    case "01n":
      return "text-yellow-400";
    case "02d":
    case "02n":
      return "text-blue-400";
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return "text-gray-400";
    case "10d":
    case "10n":
      return "text-indigo-400";
    case "09d":
    case "09n":
      return "text-indigo-600";
    default:
      return "text-blue-400";
  }
}

export default ForecastCards;
