import { useState } from "react";
import S from "./Form.module.css";

function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, number);
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit} className={S.form}>
      <label className={S.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          placeholder=""
          onChange={handleChange}
          className={S.input}
        />
      </label>
      <label className={S.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          placeholder=""
          onChange={handleChange}
          className={S.input}
        />
      </label>

      {
        <button type="submit" className={S.button}>
          Add contact
        </button>
      }
    </form>
  );
}

export default ContactForm;
