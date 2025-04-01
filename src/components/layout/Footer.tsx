const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-8 text-gray-600 text-sm">
      <p>
        <a
          href="https://github.com/saylidev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900"
        >
          &copy; 2025 SayliDev
        </a>
        {" | "}
        <a
          href="https://openweathermap.org/api"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900"
        >
          API OpenWeatherMap
        </a>
      </p>
    </footer>
  );
};

export default Footer;
