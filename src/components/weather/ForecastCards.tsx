import { ForecastDay } from "../../types/weather";
import { getForecastWeatherIcon } from "../../utils/weatherUtils";

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
          {getForecastWeatherIcon(day.icon)}
          <div className="font-bold">{day.temperature}°C</div>
        </div>
      ))}
    </div>
  );
};

export default ForecastCards;
