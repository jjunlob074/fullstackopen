const PersonsList = ({ persons, filteredPersons }) => {
    return persons.length === 0 ? (
      <p>Add a person. Come on!</p>
    ) : filteredPersons.length === 0 ? (
      <p>No users found with that name.</p>
    ) : (
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            name: <b>{person.name}</b> -- Telephone number: <b>{person.number}</b>
          </li>
        ))}
      </ul>
    );
  };
  
  export default PersonsList;
  