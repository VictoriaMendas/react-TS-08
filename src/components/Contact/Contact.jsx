import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const onDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className={css.contactBox}>
      <div>
        <span className={css.icon}>
          <FaUser />
          {contact.name}{" "}
        </span>

        <span className={css.icon}>
          <BsFillTelephoneFill />
          {contact.number}
        </span>
      </div>
      <button
        onClick={() => onDeleteContact(contact.id)}
        className={css.deleteBtn}
        type="button"
      >
        Delete
      </button>
    </div>
  );
}
