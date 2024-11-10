import Persons from '../services/persons';

const handleDeletePerson = function (deletePerson, setPersons, persons) {
  if (window.confirm('Delete ' + deletePerson.name + '?')) {
    Persons.deleteUser(deletePerson.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== deletePerson.id)); 
      })
      .catch((error) => {
        console.error('Failed to delete user:', error);
        alert('An error occurred while trying to delete the user.');
      });
  }
};


const PersonsList = ({ persons, setPersons, filteredPersons }) => {
  return persons.length === 0 ? (
    <p>Add a person. Come on!</p>
  ) : filteredPersons.length === 0 ? (
    <p>No users found with that name.</p>
  ) : (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          name: <b>{person.name}</b> -- Telephone number: <b>{person.number}</b>
          <button onClick={() => handleDeletePerson(person, setPersons, persons)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default PersonsList;
