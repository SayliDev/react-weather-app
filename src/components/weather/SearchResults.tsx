import { City } from "../../types/weather";
import { List, Thermometer } from "lucide-react";

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
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 flex items-center">
        <List className="text-primary mr-2" size={20} />
        Résultats de recherche
      </h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Nom</th>
              <th>Pays</th>
              <th>État/Région</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((city, index) => (
              <tr key={index} className="hover">
                <td className="font-medium">{city.name}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span
                      className={`fi fi-${city.country.toLowerCase()} w-4 h-3`}
                    ></span>
                    {city.country}
                  </div>
                </td>
                <td>{city.region}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onCitySelect(city)}
                  >
                    <Thermometer className="mr-1" size={16} />
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchResults;
