import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { addContact } from "../../redux/contactsSlice";
import s from "./ContactForm.module.css";

function ContactsForm() {
  const [formState, setFormState] = useState({ name: "", number: "" });
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = formState;

    if (!name.trim() || !number.trim()) {
      alert("Please provide both name and number.");
      return;
    }

    if (
      contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));
    setFormState({ name: "", number: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formState.name}
        onChange={handleChange}
        className={s.input}
      />
      <input
        type="text"
        name="number"
        placeholder="Number"
        value={formState.number}
        onChange={handleChange}
        className={s.input}
      />
      <button
        type="submit"
        className={s.button}
        disabled={!formState.name.trim() || !formState.number.trim()}
      >
        Add Contact
      </button>
    </form>
  );
}

export default ContactsForm;