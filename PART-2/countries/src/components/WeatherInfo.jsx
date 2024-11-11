const WeatherInfo = ({ weather, country }) => {
    if (!weather) {
      return null;
    }
  
    return (
      <div style={{ maxHeight: '320px',textAlign: 'center', padding: '20px', borderRadius: '8px', backgroundColor: '#007f5f' }}>
        <h2 style={{ fontSize: '24px', color: '#fff' }}>Weather in {country.capital}</h2>
        <p style={{ fontSize: '18px', color: '#fff' }}>
            Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C
        </p>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          style={{ width: '100px', height: '100px' }}
        />
        <p style={{ fontSize: '24px', color: '#fff' }}>{weather.weather[0].description}</p>
        <p style={{ fontSize: '18px', color: '#fff' }}>Humidity: {weather.main.humidity}%</p>
        <p style={{ fontSize: '18px', color: '#fff' }}>Wind: {weather.wind.speed} m/s</p>
      </div>
    );
  };
  
  export default WeatherInfo;
  