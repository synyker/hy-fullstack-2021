import React, { useEffect, useState } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhonenumber, setNewPhonenumber] = useState("");
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    console.log("effect");
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
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
      createPerson({ name: newName, number: newPhonenumber });
    } else {
      const { id, name } = persons[found];
      updatePerson({
        id: id,
        name: name,
        number: newPhonenumber,
      });
    }
  };

  const createPerson = (person) => {
    personService.create(person).then((response) => {
      setPersons(persons.concat(response.data));
      setSuccess(`Added person ${person.name}`)
      setTimeout(() => { setSuccess(null)}, 5000)
    });
  };

  const updatePerson = (newPerson) => {
    personService
      .update(newPerson)
      .then((response) => {
        setPersons(
          persons.map((person) => (person.id !== newPerson.id ? person : response.data))
        );
        setSuccess(`Updated person ${newPerson.name}`)
        setTimeout(() => { setSuccess(null)}, 5000)
      })
      .catch(error => {
        setError(`failed to update person ${newPerson.name}`)
        setTimeout(() => { setError(null)}, 5000)
      });
  };

  const deletePerson = (personToDelete) => {
    const handler = () => {
      console.log(personToDelete.id);
      personService
        .remove(personToDelete.id)
        .then((response) => {
          setPersons(
            persons.filter((person) => {
              return person.id !== personToDelete.id;
            })
          );
          setSuccess(`Deleted person ${personToDelete.name}`)
          setTimeout(() => { setSuccess(null)}, 5000)
        })
        .catch(error => {
          setError(`failed to delete person ${personToDelete.name}`)
          setTimeout(() => { setError(null)}, 5000)
        });
    };
    return handler;
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={error} type={"error"} />
      <Notification message={success} type={"success"} />
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
      <button onClick={deleteHandler(person)}>delete</button>
    </div>
  );
};

const Notification = ({ message, type }) => {
  if (message === null) return null;

  return (
    <div class={type}>
      {message}
    </div>
  )
};

export default App;
