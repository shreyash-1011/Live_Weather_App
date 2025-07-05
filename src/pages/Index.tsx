
import React, { useState, useEffect } from 'react';
import { WeatherCard } from '../components/WeatherCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { weatherService, WeatherData } from '../services/weatherService';
import { toast } from 'sonner';
import { MapPin, Sun, Moon } from 'lucide-react';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user's location and fetch weather
    getUserLocationWeather();

    return () => clearInterval(timeInterval);
  }, []);

  const getUserLocationWeather = async () => {
    try {
      setLoading(true);
      
      if (!navigator.geolocation) {
        toast.error("Geolocation is not supported by this browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await weatherService.getWeatherByCoords(latitude, longitude);
            setWeatherData(data);
          } catch (error) {
            toast.error("Failed to fetch weather data");
            console.error("Weather fetch error:", error);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Location access denied. Please search for a city manually.");
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error getting location:", error);
      setLoading(false);
    }
  };

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      const data = await weatherService.getWeatherByCity(city);
      setWeatherData(data);
      toast.success(`Weather loaded for ${data.cityName}`);
    } catch (error) {
      toast.error("City not found. Please try again.");
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <MapPin className="text-white" size={24} />
            <h1 className="text-3xl font-bold text-white">Weather Now</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-white text-sm font-medium">
              {currentTime.toLocaleTimeString()}
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            >
              {darkMode ? <Sun className="text-white" size={20} /> : <Moon className="text-white" size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Main Content */}
        <div className="flex justify-center">
          {loading ? (
            <LoadingSpinner />
          ) : weatherData ? (
            <WeatherCard weatherData={weatherData} darkMode={darkMode} />
          ) : (
            <div className="text-center text-white">
              <p className="text-xl mb-4">Welcome to Weather Now!</p>
              <p className="text-lg opacity-80">Search for a city to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
