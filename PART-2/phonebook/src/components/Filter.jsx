const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClearFilter = () => {
    setFilter("");
  };

  return (
    <div>
      filter shown with{" "}
      <input type="text" value={filter} onChange={handleFilterChange} />
      <br />
      <button onClick={handleClearFilter}>Show All</button>
    </div>
  );
};

export default Filter;
