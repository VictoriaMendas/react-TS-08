import { selectError, selectIsLoading } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import { useEffect } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { useAppDispatch, useAppSelector } from "../../redux/store";

function ContactsPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const errorMessage = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && <div>Loading...</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <ContactList />
    </div>
  );
}

export default ContactsPage;
