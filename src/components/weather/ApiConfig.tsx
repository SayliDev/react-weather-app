import {
  Eye,
  EyeOff,
  Info,
  KeyRound,
  CheckCircle2,
  XCircle,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { OpenWeatherMapService } from "../../services/weatherApi";

interface ApiConfigProps {
  apiToken: string;
  onApiTokenChange: (token: string) => void;
}

const ApiConfig: React.FC<ApiConfigProps> = ({
  apiToken,
  onApiTokenChange,
}) => {
  const [showToken, setShowToken] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const validateKey = async () => {
      if (!apiToken) {
        setIsValid(null);
        return;
      }

      const service = new OpenWeatherMapService(apiToken);
      const valid = await service.validateApiKey();
      setIsValid(valid);
    };

    const timeoutId = setTimeout(validateKey, 500);
    return () => clearTimeout(timeoutId);
  }, [apiToken]);

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 overflow-hidden">
      <div
        className="p-3 flex items-center justify-between cursor-pointer border-b border-base-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className=" p-2 rounded-full">
            <KeyRound className="text-primary" size={20} />
          </div>
          <h3 className="text-lg font-medium">Configuration API</h3>
        </div>
        <div
          className={`transform transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={20} />
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Token API OpenWeatherMap
              </span>
            </label>

            <div className="relative">
              <input
                type={showToken ? "text" : "password"}
                placeholder="Entrez votre token API"
                className={`input input-bordered w-full pr-10 ${
                  isValid === true
                    ? "input-success border-success"
                    : isValid === false
                    ? "input-error border-error"
                    : ""
                }`}
                value={apiToken}
                onChange={(e) => onApiTokenChange(e.target.value)}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer p-2 rounded-full"
                onClick={() => setShowToken(!showToken)}
                aria-label={
                  showToken ? "Masquer le token" : "Afficher le token"
                }
              >
                {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {isValid !== null && (
              <div
                className={`mt-2 flex items-center gap-2 text-sm font-medium ${
                  isValid ? "text-success" : "text-error"
                }`}
              >
                {isValid ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Clé API valide</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} />
                    <span>Clé API invalide</span>
                  </>
                )}
              </div>
            )}

            <div className="mt-3 bg-info bg-opacity-10 p-3 rounded-lg flex items-start gap-2">
              <Info className="text-primary flex-shrink-0 mt-0.5" size={16} />
              <span className="text-sm">
                Obtenez votre token gratuit sur{" "}
                <a
                  href="https://openweathermap.org/"
                  className="text-primary hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  openweathermap.org
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiConfig;
