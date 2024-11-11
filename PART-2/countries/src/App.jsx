import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import Weather from './services/weather';
import WeatherInfo from './components/WeatherInfo'; // Asegúrate de que la ruta sea correcta


const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null); 
  const [exactMatch, setExactMatch] = useState(null); 

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(({ data: infoCountries }) => setCountries(infoCountries))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (query) {
      const results = countries.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredCountries(
        results.length > 10 ? ['Too many matches'] : results
      );

      const match = results.find(
        (country) => country.name.common.toLowerCase() === query.toLowerCase()
      );
      setExactMatch(match || null);
    } else {
      setFilteredCountries([]);
      setExactMatch(null);
    }
  }, [query, countries]);

  useEffect(() => {
    if (selectedCountry || exactMatch) {
      const { capitalInfo } = selectedCountry || exactMatch || {};
      const { latlng } = capitalInfo || {};

      if (latlng) {
        const [lat, lon] = latlng;
        Weather.getWeather(lon, lat)
          .then((data) => setWeather(data))
          .catch(console.error);
      }
    }
  }, [selectedCountry, exactMatch]);

  const handleInputChange = (input) => {
    setQuery(input.target.value);
    setSelectedCountry(null);
    setWeather(null);
  };

  const handleButtonClick = (country) => {
    setFilteredCountries([]);
    setSelectedCountry(country);
  };

  return (
    <div className="container">
      <h1>Countries</h1>
      <SearchInput query={query} handleInputChange={handleInputChange} />
      <div className='country'>
      {!exactMatch && <CountryList filteredCountries={filteredCountries} handleButtonClick={handleButtonClick} />}
      {(exactMatch || selectedCountry) && (
        <CountryDetail country={exactMatch || selectedCountry} />
      )}
      {weather && (
        <WeatherInfo weather={weather} country={selectedCountry || exactMatch} />
      )}
      </div>
    </div>
  );
}
  
export default App;
