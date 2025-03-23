import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/actions";
import s from "./Contact.module.css";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={s.contactCard}>
      <div className={s.info}>
        <div className={s.name}>
          <span className={s.icon}>
            <img src="/svg/user.svg" alt="name" width={18} height={18} />
          </span>
          {name}
        </div>
        <div className={s.number}>
          <span className={s.icon}>
            <img src="/svg/phone.svg" alt="number" width={18} height={18} />
          </span>
          {number}
        </div>
      </div>
      <button
        className={s.deleteButton}
        onClick={handleDelete}
        aria-label={`Delete contact ${name}`}
      >
        Delete
      </button>
    </div>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Contact;