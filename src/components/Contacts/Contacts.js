import S from "./Contacts.module.css";

const Contacts = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={S.container}>
        <p className={S.name}>
          {name}: {number}{" "}
        </p>
        {
          <button
            className={S.button}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Удалить
          </button>
        }
      </li>
    ))}
  </ul>
);

export default Contacts;
