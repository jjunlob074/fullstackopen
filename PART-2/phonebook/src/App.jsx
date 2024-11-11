import { useState,useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import Persons from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({ message: '', type: '' });
  const hookGetPersons = () => {
    Persons
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  
  useEffect(hookGetPersons, [])

  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

    const showNotification = (message, type) => {
      setNotification({ message, type });
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        notification={notification}
        showNotification={showNotification}
      />
      <h3>Numbers</h3>
      <PersonsList 
      persons={persons} 
      setPersons= {setPersons}
      filteredPersons={filteredPersons}
      showNotification={showNotification}  
      />
    </div>
  );
};

export default App;
