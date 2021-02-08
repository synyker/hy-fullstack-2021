import React, { useEffect, useState } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhonenumber, setNewPhonenumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length);
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
      personService
        .create({ name: newName, number: newPhonenumber })
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewPhonenumber("");
        });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const deletePerson = (id) => {
    const handler = () => {
      console.log(id)
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => {
            return person.id !== id
          }))
        })
    };
    return handler;
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
      <Persons persons={personsToShow} deleteHandler={deletePerson} />
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
  const { persons, deleteHandler } = props;
  return (
    <div>
      <h2>Numbers</h2>
      {persons &&
        persons.map((person) => (
          <Person
            key={person.name}
            person={person}
            deleteHandler={deleteHandler}
          />
        ))}
    </div>
  );
};

const Person = (props) => {
  const { person, deleteHandler } = props;
  return (
    <div>
      <span>
        {person.name} {person.number}
      </span>
      <button onClick={deleteHandler(person.id)}>delete</button>
    </div>
  );
};

export default App;
