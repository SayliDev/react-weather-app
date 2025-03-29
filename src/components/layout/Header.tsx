import { SunSnow } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-block p-3 rounded-full ">
        <SunSnow size={40} />
      </div>
      <h1 className="text-4xl font-bold text-primary mb-2">React Weather</h1>
      <p className="text-lg text-gray-600">La météo en temps réel</p>
    </div>
  );
};

export default Header;
