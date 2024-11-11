import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API;

const getWeather = (lon, lat) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${apiKey}`;
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al obtener los datos del clima:', error);
      return null;
    });
};

export default { 
  getWeather 
};
