import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  
  const [newName, setNewName] = useState("");
  const [newPhonenumber, setNewPhonenumber] = useState("");
  const [filter, setFilter] = useState("");
  
  const personsToShow = filter.length === 0 ? persons : persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhonenumberChange = (event) => {
    setNewPhonenumber(event.target.value)
  };

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.findIndex((person) => person.name === newName);
    if (found < 0) {
      setPersons(persons.concat({ name: newName, number: newPhonenumber }));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
 
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleFilterChange} />
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNewNameChange} />
          number: <input onChange={handleNewPhonenumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons &&
        personsToShow.map((person) => {
          return <p key={person.name}>{person.name} {person.number}</p>;
        })}
    </div>
  );
};

export default App;
