import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(({ data:infoCountries }) => setCountries(infoCountries))
      .catch(console.error);
  }, []);
  // EL SEGUNDO VALOR ES COMO LA CLAVE VALOR, FUNCION DEL USESTATE
  // LE ESTÁS DICIENDO CUANDO CAMBIE EL QUERY, EJECUTAME
  // OTRA VEZ ESTE USEFFECT PARA ACTUALIZAR RESULTS CON LOS DATOS DE LOS PAISES (COUNTRIES)
  useEffect(() => {
    if (query) {
      const results = countries.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredCountries(
        results.length > 10 ? ['Too many matches'] : results
      );
    } else {
      setFilteredCountries([]);
    }
  }, [query, countries]);

  const handleInputChange = (input) => {
    setQuery(input.target.value);
    setSelectedCountry(null);
  };

  const handleButtonClick = (country) => {
    setFilteredCountries([]);
    setSelectedCountry(country);
  };

  const exactMatch = filteredCountries.find(
    (country) => country.name?.common.toLowerCase() === query.toLowerCase()
  );

  return (
    <div className="container">
      <h1>Countries</h1>
      <SearchInput query={query} handleInputChange={handleInputChange} />
      {!exactMatch && <CountryList filteredCountries={filteredCountries} handleButtonClick={handleButtonClick} />}
      {exactMatch && <CountryDetail country={exactMatch} />}
      {selectedCountry && <CountryDetail country={selectedCountry} />}
    </div>
  );
};

export default App;
