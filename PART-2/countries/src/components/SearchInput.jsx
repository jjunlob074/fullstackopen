const SearchInput = ({ query, handleInputChange }) => (
    <input
      type="text"
      placeholder="Search for a country..."
      value={query}
      onChange={handleInputChange}
    />
  );
  
  export default SearchInput;
  