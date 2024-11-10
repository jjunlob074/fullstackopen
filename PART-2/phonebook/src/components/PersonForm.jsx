import Persons from "../services/persons";

const PersonForm = (props) => {
  const { persons, setPersons, setNewName, setNewNumber, newName, newNumber } = props;

  const checkDuplicatePerson = () => {
    const duplicatePerson = persons.find(
      (person) => person.name === newName || person.number === newNumber
    );

    // NO HAY DUPLICADOS, TIENES QUE CREAR UN NUEVO USUARIO
    if (!duplicatePerson) return false;

    const duplicateField = duplicatePerson.name === newName ? "name" : "number";
    const confirmUpdatePerson = window.confirm(
      `The ${duplicateField} "${duplicatePerson[duplicateField]}" is already in the phonebook. 
    Do you want to update their ${duplicateField === "name" ? "number" : "name"}?`
    );
  
    if (confirmUpdatePerson) {
      Persons.update(duplicatePerson.id, { name: newName, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => alert("Error updating person: " + error.message));
    }
    return true;
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Si `checkDuplicate` devuelve `true`, Es que se tiene que actualizar el usuario
    // no crear uno nuevo, por eso para la ejecucion
    if (checkDuplicatePerson()) return;
    
    const newPerson = { name: newName, number: newNumber };
    Persons.create(newPerson)
      .then((returnedPerson) => {
        setPersons((prevPersons) => [...prevPersons, returnedPerson]);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => alert("Error creating person: " + error.message));
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
