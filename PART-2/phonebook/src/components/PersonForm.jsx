import NotificationMessage from './NotificationMessage';
import Persons from '../services/persons';

const PersonForm = (props) => {
  const {
    persons, setPersons, setNewName, setNewNumber, newName, newNumber,
    notification,showNotification} = props;

  const checkDuplicatePerson = () => {
    const duplicatePerson = persons.find(
      (person) => person.name === newName || person.number === newNumber
    );

    if (!duplicatePerson) return false;

    const duplicateField = duplicatePerson.name === newName ? 'name' : 'number';
    const confirmUpdatePerson = window.confirm(
      `The ${duplicateField} "${duplicatePerson[duplicateField]}" is already in the phonebook. 
      Do you want to update their ${duplicateField === 'name' ? 'number' : 'name'}?`
    );

    if (confirmUpdatePerson) {
      Persons.update(duplicatePerson.id, { name: newName, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
          setNewName('');
          setNewNumber('');
          showNotification(`Successfully updated ${updatedPerson.name}`, 'success');
        })
        .catch((error) => showNotification(`Error updating person: ${error.message}`, 'error'));
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkDuplicatePerson()) return;

    const newPerson = { name: newName, number: newNumber };
    Persons.create(newPerson)
      .then((returnedPerson) => {
        setPersons((prevPersons) => [...prevPersons, returnedPerson]);
        setNewName('');
        setNewNumber('');
        showNotification(`Successfully added ${returnedPerson.name}`, 'success');
      })
      .catch((error) => showNotification(`Error creating person: ${error.response.data.error}`, 'error'));
  };

  return (
    <div>
      <NotificationMessage message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name: &nbsp; &nbsp;
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
    </div>
  );
};

export default PersonForm;
