import { useState, useEffect, useRef } from "react";
import shortid from "shortid";
import Section from "./components/Section";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import listOfContact from "./data/contacts.json";

function App() {
  const [contacts, setContacts] = useState(listOfContact);
  const [filter, setFilter] = useState("");
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      const parsedContacts = JSON.parse(localStorage.getItem("contacts"));

      if (parsedContacts) {
        setContacts(parsedContacts);
      }

      firstRender.current = false;
      return;
    }
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  function addContact(name, number) {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
      ? alert(`${name} is already added.`)
      : setContacts((prevContacts) => [contact, ...prevContacts]);
  }

  function getContacts() {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
  function changeFilter(event) {
    setFilter(event.currentTarget.value);
  }
  function onDeleteContact(contactId) {
    setContacts(() => contacts.filter((contact) => contact.id !== contactId));
    setFilter("");
  }

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <Contacts contacts={getContacts()} onDeleteContact={onDeleteContact} />
      </Section>
    </>
  );
}

export default App;
