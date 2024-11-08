import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const nameExists = (name) => persons.some(person => person.name === name);

  const handleSubmit = (event) => {
    event.preventDefault()
    if (nameExists(newName)) {
      alert(`${newName} is already in the phonebook!`)
      return
    }
    setPersons([...persons, { name: newName }])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={(event) => setNewName(event.target.value)} 
          value={newName} 
          required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length === 0 ? (
        <p>Add a person. Come on!</p>
      ) : (
        <ul>
          {persons.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
