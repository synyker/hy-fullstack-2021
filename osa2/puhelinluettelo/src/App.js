import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhonenumber, setNewPhonenumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data);
      });
  }, [])
  console.log("render", persons.length)
  const personsToShow =
    filter.length === 0
      ? persons
      : persons.filter((person) => {
          return person.name.toLowerCase().includes(filter.toLowerCase());
        });

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhonenumberChange = (event) => {
    setNewPhonenumber(event.target.value);
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
      <FilterForm handler={handleFilterChange} />
      <AddPersonForm 
        nameChangeHandler={handleNewNameChange}
        numberChangeHandler={handleNewPhonenumberChange}
        submitHandler={addPerson}
      />
      <Persons persons={personsToShow} />
    </div>
  );
};

const FilterForm = (props) => {
  const { handler } = props;
  return (
    <div>
      filter shown with <input onChange={handler} />
    </div>
  );
};

const AddPersonForm = (props) => {
  const { nameChangeHandler, numberChangeHandler, submitHandler } = props;
  return (
    <div>
      <h2>add new</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input onChange={nameChangeHandler} />
          number: <input onChange={numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = (props) => {
  const { persons } = props;
  return (
    <div>
      <h2>Numbers</h2>
      {persons && persons.map((person) => <Person key={person.name} person={person} />)}
    </div>
  );
};

const Person = (props) => {
  const { person } = props;
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

export default App;
