import { useState, useEffect } from "react";
import shortid from "shortid";
import Section from "./components/Section";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import listOfContact from "./data/contacts.json";

function App() {
  const [contacts, setContacts] = useState(() => [...listOfContact]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (localStorage.getItem("contacts") !== null) {
      const data = JSON.parse(window.localStorage.getItem("contacts"));
      setContacts(data);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (contacts.find((contact) => contact.name === name)) {
      alert(`${name} is already added.`);
      return;
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    setContacts((prevContacts) => [contact, ...prevContacts]);
  };

  const getContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };
  const onDeleteContact = (contactId) => {
    setContacts(() => contacts.filter((contact) => contact.id !== contactId));
    setFilter("");
  };

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
