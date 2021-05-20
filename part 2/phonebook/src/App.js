import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personsService from "../src/services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notificationMsg, setNotificationMsg] = useState({
    message: null,
    isError: null,
  });

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow = filter
    ? persons.filter((p) => p.name.includes(filter))
    : persons;

  const updatePerson = (id, newObj) => {
    personsService
      .update(id, newObj)
      .then((updatedPerson) => {
        const updPersons = [...persons].map((p) =>
          p.id === updatedPerson.id ? updatedPerson : p
        );
        setPersons(updPersons);
        makeNotification(`Success updating ${updatedPerson.name}`, false);
      })
      .catch((error) => {
        makeNotification(
          `Information for ${newObj.name} has been already deleted from the server`,
          true
        );
      });
  };

  const addPerson = (newPerson) => {
    const existingPerson = persons.find((p) => p.name === newPerson.name);

    if (existingPerson) {
      if (
        window.confirm(
          `${newPerson.name} is already on the phonebook, replace old number with a new one?`
        )
      ) {
        return updatePerson(existingPerson.id, newPerson);
      }
    }

    personsService
      .create(newPerson)
      .then((returnedNote) => {
        makeNotification(`Success adding ${newPerson.name}`, false);
        setPersons(persons.concat(returnedNote));
      })
      .catch((error) => {
        makeNotification(error.message, true);
      });
  };

  const deletePerson = (id) => {
    const personsName = persons.find((p) => p.id === id).name;
    if (
      window.confirm(
        `You're about to delete ${personsName}, are you sure of it?`
      )
    ) {
      personsService
        .onDelete(id)
        .then((r) =>
          makeNotification(`Success deleting ${personsName}`, false)
        );
      setPersons(persons.filter((p) => p.id !== id)).catch((error) => {
        makeNotification(error.message, true);
      });
    }
  };

  const makeNotification = (message, isError) => {
    setNotificationMsg({ message, isError });
    setTimeout(() => {
      setNotificationMsg({ message: null, isError: null });
    }, 5000);
  };

  return (
    <div>
      <Notification
        message={notificationMsg.message}
        isError={notificationMsg.isError}
      />
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h2>Add new</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
