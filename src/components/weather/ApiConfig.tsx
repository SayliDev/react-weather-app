import { Eye, EyeOff, Info, KeyRound } from "lucide-react";
import { useState } from "react";

interface ApiConfigProps {
  apiToken: string;
  onApiTokenChange: (token: string) => void;
}

const ApiConfig: React.FC<ApiConfigProps> = ({
  apiToken,
  onApiTokenChange,
}) => {
  const [showToken, setShowToken] = useState(false);

  return (
    <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-6">
      <input type="checkbox" />
      <div className="collapse-title text-lg font-medium">
        <KeyRound className="inline text-primary mr-2" size={20} />
        Configuration API
      </div>
      <div className="collapse-content">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Token API OpenWeatherMap</span>
          </label>
          <div className="input-group flex items-center">
            <input
              type={showToken ? "text" : "password"}
              placeholder="Entrez votre token API"
              className="input input-bordered w-full"
              value={apiToken}
              onChange={(e) => onApiTokenChange(e.target.value)}
            />
            <button
              className="btn btn-square btn-outline"
              onClick={() => setShowToken(!showToken)}
            >
              {showToken ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <label className="label">
            <span className="label-text-alt text-info">
              <Info className="inline mr-1" size={16} />
              Obtenez votre token gratuit sur{" "}
              <a
                href="https://openweathermap.org/"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                openweathermap.org
              </a>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ApiConfig;
