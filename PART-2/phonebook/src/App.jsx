import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              onChange={(event) => setNewName(event.target.value)}
              value={newName}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Number:
            <input
              onChange={(event) => setNewNumber(event.target.value)}
              value={newNumber}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length === 0 ? (
        <p>Add a person. Come on!</p>
      ) : (
        <ul>
          {persons.map((person) => (
            <li key={person.name}>
              {person.name} -- {person.number}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
