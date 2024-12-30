import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

import { deleteContact } from "../../redux/contacts/operations";
import { useAppDispatch } from "../../redux/store";
import { Contact as IContact } from "../../@types/contacts";
import { FC } from "react";
interface ContactProps {
  contact: IContact;
}

const Contact: FC<ContactProps> = ({ contact }) => {
  const dispatch = useAppDispatch();

  const onDeleteContact = (contactId: string) => {
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
};
export default Contact;
