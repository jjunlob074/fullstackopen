const CountryList = ({ filteredCountries, handleButtonClick }) => (
    <ul>
      {filteredCountries.map((country, index) => (
        <li key={index}>
          {filteredCountries[index] !== 'Too many matches' && country.flags?.png && (
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name?.common}`}
              width="30"
              style={{ marginRight: '10px' }}
            />
          )}
          {country.name ? country.name.common : filteredCountries[index]}
          {filteredCountries[index] !== 'Too many matches' && (
          <button onClick={() => handleButtonClick(country)}>Show Details</button>
        )}
        </li>
      ))}
    </ul>
  );
  
  export default CountryList;
  