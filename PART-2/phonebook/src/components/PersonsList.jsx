import Persons from '../services/persons';

const PersonsList = ({ persons, setPersons, filteredPersons, showNotification }) => {
  const handleDeletePerson = (deletePerson) => {
    if (window.confirm('Delete ' + deletePerson.name + '?')) {
      Persons.deleteUser(deletePerson.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== deletePerson.id));
          showNotification(`Successfully deleted ${deletePerson.name}`, 'success' );
        })
        .catch((error) => {
          console.error('Failed to delete user:', error);
          showNotification('An error occurred while trying to delete the user.','error' );
        });
    }
  };

  return (
    <>
      {persons.length === 0 ? (
        <p>Add a person. Come on!</p>
      ) : filteredPersons.length === 0 ? (
        <p>No users found with that name.</p>
      ) : (
        <ul>
          {filteredPersons.map((person) => (
            <li key={person.id}>
              name: <b>{person.name}</b> Telephone number: <b>{person.number}</b>
              <button className="buttonDelete" onClick={() => handleDeletePerson(person)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default PersonsList;
