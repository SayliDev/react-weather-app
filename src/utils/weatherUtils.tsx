import { Sun, Cloud, CloudRain, CloudSun, CloudDrizzle } from "lucide-react";

export const getTemperatureGradient = (temperature: number) => {
  if (temperature <= 0) {
    return "bg-gradient-to-br from-blue-100 to-blue-300";
  } else if (temperature <= 10) {
    return "bg-gradient-to-br from-blue-100 to-cyan-300";
  } else if (temperature <= 20) {
    return "bg-gradient-to-br from-cyan-100 to-yellow-300";
  } else if (temperature <= 30) {
    return "bg-gradient-to-br from-yellow-100 to-orange-300";
  } else {
    return "bg-gradient-to-br from-orange-100 to-red-300";
  }
};

export const getTemperatureColor = (temperature: number) => {
  if (temperature <= 0) {
    return "text-blue-500";
  } else if (temperature <= 10) {
    return "text-cyan-500";
  } else if (temperature <= 20) {
    return "text-yellow-500";
  } else if (temperature <= 30) {
    return "text-orange-500";
  } else {
    return "text-red-500";
  }
};

export const getWeatherIcon = (icon: string) => {
  const iconProps = {
    size: 48,
    className: "text-yellow-400 mr-3",
  };

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
    default:
      return <Sun {...iconProps} />;
  }
};

export const getForecastWeatherIcon = (icon: string) => {
  const iconProps = {
    size: 24,
    className: `my-2 ${getForecastIconColorClass(icon)}`,
  };

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
};

export const getForecastIconColorClass = (icon: string): string => {
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
};
