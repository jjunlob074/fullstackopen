const CountryList = ({ filteredCountries, handleButtonClick }) => (
  <ul>
    {filteredCountries.map((country, index) => (
      <li key={index}>
        {country.flags?.png && (
          <img
            className="suggestions-img"
            src={country.flags.png}
            alt={`Flag of ${country.name?.common}`}
            width="30"
            style={{ marginRight: '10px', border: '1px solid #0c0f0a', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
          />
        )}
        <p className="suggestions-text">{country.name ? country.name.common : filteredCountries[index]}</p>
        {country.name && (
            <button onClick={() => handleButtonClick(country)}>Show Details</button>
          )}
      </li>
    ))}
  </ul>
);

export default CountryList;
