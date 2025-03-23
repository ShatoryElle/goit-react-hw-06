import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { deleteContact } from "../../redux/contactsSlice.js";
import s from "./ContactList.module.css";

function ContactList() {
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);
  const dispatch = useDispatch();

  const visibleContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  if (visibleContacts.length === 0) {
    return <p className={s.message}>No contacts found.</p>;
  }

  return (
    <ul className={s.list}>
      {visibleContacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <p className={s.contactInfo}>
            <span className={s.contactName}>{name}:</span>{" "}
            <span className={s.contactNumber}>{number}</span>
          </p>
          <button
            className={s.button}
            onClick={() => dispatch(deleteContact(id))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                dispatch(deleteContact(id));
              }
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;