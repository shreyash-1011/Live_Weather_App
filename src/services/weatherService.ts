
export interface WeatherData {
  cityName: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  icon: string;
}

class WeatherService {
  private readonly API_KEY = 'c457a66a350798f0c2030e09d599e4ab'; // Users need to replace this
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    const url = `${this.BASE_URL}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`;
    return this.fetchWeatherData(url);
  }

  async getWeatherByCity(city: string): Promise<WeatherData> {
    const url = `${this.BASE_URL}?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`;
    return this.fetchWeatherData(url);
  }

  private async fetchWeatherData(url: string): Promise<WeatherData> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else if (response.status === 404) {
          throw new Error('City not found. Please check the city name and try again.');
        } else {
          throw new Error(`Weather service error: ${response.status}`);
        }
      }

      const data = await response.json();
      
      return {
        cityName: `${data.name}, ${data.sys.country}`,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        visibility: data.visibility,
        icon: data.weather[0].icon,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch weather data. Please check your internet connection.');
    }
  }
}

export const weatherService = new WeatherService();
