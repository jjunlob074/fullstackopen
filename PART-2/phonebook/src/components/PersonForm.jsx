const PersonForm = (props) => {
  const { persons, setPersons, setNewName, setNewNumber, newName, newNumber } =
    props;
  const checkDuplicate = () => {
    const duplicate = persons.find(
      (person) => person.name === newName || person.number === newNumber
    );
    if (duplicate) {
      return duplicate.name === newName
        ? `${newName} is already in the phonebook!`
        : `${newNumber} is already in the phonebook!`;
    }
    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const duplicateMessage = checkDuplicate();
    if (duplicateMessage) {
      alert(duplicateMessage);
      return;
    }
    const newId = persons.length
      ? Math.max(...persons.map((p) => p.id)) + 1
      : 1;
    setPersons([...persons, { name: newName, number: newNumber, id: newId }]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Number:
          <input
            onChange={(e) => setNewNumber(e.target.value)}
            value={newNumber}
            required
          />
        </label>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
