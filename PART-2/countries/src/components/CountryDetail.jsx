const CountryDetail = ({ country }) => (
    <div className="card">
      <h2>{country.name.common}</h2>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="100"
      />
      <p><strong>Capital:</strong> {country.capital[0]}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <p><strong>Currency: </strong>  
      {Object.keys(country.currencies).join(', ')}
      </p>
      <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
    </div>
  );
  
  export default CountryDetail;
  