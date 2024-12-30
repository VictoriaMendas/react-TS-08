// import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import Contact from "../Contact/Contact";
import { useAppSelector } from "../../redux/store";

export default function ContactList() {
  const contacts = useAppSelector(selectFilteredContacts);
  console.log(contacts);
  return (
    <div>
      <ul className={css.contact}>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
}
