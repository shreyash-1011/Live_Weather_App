
import React from 'react';
import { WeatherData } from '../services/weatherService';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';

interface WeatherCardProps {
  weatherData: WeatherData;
  darkMode: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, darkMode }) => {
  const [isCelsius, setIsCelsius] = React.useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const getTemperature = () => {
    if (isCelsius) {
      return Math.round(weatherData.temperature);
    } else {
      return Math.round((weatherData.temperature * 9/5) + 32);
    }
  };

  const getWeatherIcon = () => {
    const iconCode = weatherData.icon;
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className={`relative overflow-hidden max-w-md w-full mx-auto rounded-3xl shadow-2xl backdrop-blur-md transition-all duration-500 ${
      darkMode 
        ? 'bg-white/10 border border-white/20' 
        : 'bg-white/20 border border-white/30'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
      </div>

      <div className="relative p-8">
        {/* City Name */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">{weatherData.cityName}</h2>
          <p className="text-white/80 text-sm">{new Date().toLocaleDateString()}</p>
        </div>

        {/* Temperature & Weather */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src={getWeatherIcon()} 
              alt={weatherData.description}
              className="w-20 h-20"
            />
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span 
              className="text-5xl font-light text-white cursor-pointer hover:scale-105 transition-transform"
              onClick={toggleTemperatureUnit}
            >
              {getTemperature()}°
            </span>
            <span 
              className="text-2xl text-white/80 cursor-pointer hover:text-white transition-colors"
              onClick={toggleTemperatureUnit}
            >
              {isCelsius ? 'C' : 'F'}
            </span>
          </div>
          
          <p className="text-white/90 text-lg capitalize">{weatherData.description}</p>
          <p className="text-white/70 text-sm">Feels like {Math.round(weatherData.feelsLike)}°{isCelsius ? 'C' : 'F'}</p>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="text-white/80" size={20} />
              <span className="text-white/80 text-sm">Humidity</span>
            </div>
            <p className="text-white text-xl font-semibold">{weatherData.humidity}%</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Wind className="text-white/80" size={20} />
              <span className="text-white/80 text-sm">Wind</span>
            </div>
            <p className="text-white text-xl font-semibold">{weatherData.windSpeed} m/s</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="text-white/80" size={20} />
              <span className="text-white/80 text-sm">Visibility</span>
            </div>
            <p className="text-white text-xl font-semibold">{(weatherData.visibility / 1000).toFixed(1)} km</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Thermometer className="text-white/80" size={20} />
              <span className="text-white/80 text-sm">Pressure</span>
            </div>
            <p className="text-white text-xl font-semibold">{weatherData.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};
