import { City } from "../../types/weather";
import { Globe, List, Thermometer, MapPin } from "lucide-react";

interface SearchResultsProps {
  results: City[];
  onCitySelect: (city: City) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onCitySelect,
}) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 animate-in fade-in duration-300">
      <h2 className="text-xl font-semibold mb-3 flex items-center text-gray-800">
        <List className="text-primary mr-2" size={20} />
        Résultats de recherche ({results.length})
      </h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pays
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  État/Région
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {results.map((city, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                >
                  <td className="px-4 py-4 text-gray-900 flex items-center">
                    <MapPin className="w-4 h-4 text-gray-600 mr-2" />
                    {city.name}
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      {city.country}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    {city.region || "-"}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm
                      cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
                      onClick={() => onCitySelect(city)}
                    >
                      <Thermometer className="mr-1.5" size={16} />
                      Voir la météo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
