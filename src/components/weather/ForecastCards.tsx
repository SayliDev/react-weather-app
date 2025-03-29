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
          <div className="text-sm font-medium">{day.day}</div>
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

  switch (icon) {
    case "☀️":
      return <Sun {...iconProps} />;
    case "⛅":
      return <CloudSun {...iconProps} />;
    case "☁️":
      return <Cloud {...iconProps} />;
    case "🌧️":
      return <CloudRain {...iconProps} />;
    case "⛈️":
      return <CloudDrizzle {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
}

function getIconColorClass(icon: string): string {
  switch (icon) {
    case "☀️":
      return "text-yellow-400";
    case "⛅":
      return "text-blue-400";
    case "☁️":
      return "text-gray-400";
    case "🌧️":
      return "text-indigo-400";
    case "⛈️":
      return "text-indigo-600";
    default:
      return "text-blue-400";
  }
}

export default ForecastCards;
