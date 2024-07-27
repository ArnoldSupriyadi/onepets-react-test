// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import clearDay from './assets/clear-day.json';
import partlyCloudyDay from './assets/partly-cloudy-day.json';
import cloudy from './assets/cloudy.json';
import rainy from './assets/rainy.json';
import thunderstorm from './assets/thunderstrom.json';
import './App.css';
import Map from './Map';

const getWeatherStatus = (weathercode) => {
  switch (weathercode) {
    case 0: return 'Cerah';
    case 1: return 'Cerah Berawan';
    case 2: return 'Berawan';
    case 3: return 'Berawan Tebal';
    case 45: return 'Kabut';
    case 48: return 'Kabut Beku';
    case 51: return 'Hujan Ringan';
    case 53: return 'Hujan Sedang';
    case 55: return 'Hujan Lebat';
    case 56: return 'Hujan Ringan Beku';
    case 57: return 'Hujan Lebat Beku';
    case 61: return 'Hujan Singkat';
    case 63: return 'Hujan Sedang';
    case 65: return 'Hujan Lebat';
    case 66: return 'Hujan Singkat Beku';
    case 67: return 'Hujan Lebat Beku';
    case 71: return 'Salju Ringan';
    case 73: return 'Salju Sedang';
    case 75: return 'Salju Lebat';
    case 77: return 'Salju Ringan';
    case 80: return 'Hujan Ringan';
    case 81: return 'Hujan Sedang';
    case 82: return 'Hujan Lebat';
    case 85: return 'Salju Ringan';
    case 86: return 'Salju Lebat';
    case 95: return 'Badai Petir Ringan';
    case 96: return 'Badai Petir dengan Hujan';
    case 99: return 'Badai Petir dengan Hujan Lebat';
    default: return 'Status Cuaca Tidak Diketahui';
  }
};

const getWeatherAnimation = (weathercode) => {
  switch (weathercode) {
    case 0: return clearDay;
    case 1: return partlyCloudyDay;
    case 2: return cloudy;
    case 3: return cloudy;
    case 45: return cloudy;
    case 48: return cloudy;
    case 51: return rainy;
    case 53: return rainy;
    case 55: return rainy;
    case 56: return rainy;
    case 57: return rainy;
    case 61: return rainy;
    case 63: return rainy;
    case 65: return rainy;
    case 66: return rainy;
    case 67: return rainy;
    // case 71: return snowy;
    // case 73: return snowy;
    // case 75: return snowy;
    // case 77: return snowy;
    case 80: return rainy;
    case 81: return rainy;
    case 82: return rainy;
    // case 85: return snowy;
    // case 86: return snowy;
    case 95: return thunderstorm;
    case 96: return thunderstorm;
    case 99: return thunderstorm;
    default: return clearDay;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false };
  return date.toLocaleDateString('id-ID', options);
};

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: -6.1931,
            longitude: 106.8217,
            current_weather: true,
            timezone: 'Asia/Jakarta'
          }
        });
        console.log('Weather Data:', response.data);
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the weather data', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData || !weatherData.current_weather) {
    return <div>Failed to fetch weather data</div>;
  }

  const { temperature, windspeed, weathercode, time } = weatherData.current_weather;
  const weatherStatus = getWeatherStatus(weathercode);
  const animationData = getWeatherAnimation(weathercode);
  const formattedDate = formatDate(time);

  return (
    <div className="container">
      <h1 className="my-4">Weather Information for Plaza Indonesia</h1>
      <img 
        src="https://www.asiadreams.com/wp-content/uploads/plazaindonesia-web.jpg" 
        alt="Plaza Indonesia" 
        className="img-fluid mb-4"
      />

      <div className="card">
        <div className="card-body">
        <div className="weather-icon">
            {animationData && <Lottie animationData={animationData} style={{ width: 150, height: 150 }} />}
          </div>
          <h3>Date: {formattedDate}</h3>
          <p>Temperature: {temperature}°C</p>
          <p>Wind Speed: {windspeed} km/h</p>
          <p>Timezone: {weatherData.timezone}</p>
          <p>Weather Status: {weatherStatus}</p>
        </div>
      </div>
      <Map />
    </div>
  );
};

export default App;
