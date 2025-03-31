import { City } from "../../types/weather";
import { Globe, List, Thermometer, MapPin, SearchX } from "lucide-react";

interface SearchResultsProps {
  results: City[];
  onCitySelect: (city: City) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onCitySelect,
}) => {
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <SearchX className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium">Aucun résultat trouvé</p>
        <p className="text-sm mt-2">
          Veuillez vérifier la saisie ou essayer une autre ville.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 animate-in fade-in duration-300">
      <h2 className="text-xl font-semibold mb-3 flex items-center text-gray-800">
        <List className="text-primary mr-2" size={20} />
        Suggestions ({results.length})
      </h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="divide-y divide-gray-200">
          {results.map((city, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">{city.name}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Globe className="w-4 h-4 mr-1" />
                      {city.country}
                      {city.region && city.region !== city.name && (
                        <span className="ml-2">• {city.region}</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm
                  cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
                  onClick={() => onCitySelect(city)}
                >
                  <Thermometer className="mr-1.5" size={16} />
                  Voir la météo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
