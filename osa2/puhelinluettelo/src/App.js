import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    console.log("form submit", event.target);
    const found = persons.findIndex((person) => person.name === newName);
    if (found < 0) {
      setPersons(persons.concat({ name: newName }));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons &&
        persons.map((person) => {
          return <p key={person.name}>{person.name}</p>;
        })}
    </div>
  );
};

export default App;
