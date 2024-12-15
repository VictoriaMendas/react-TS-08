import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const INITIAL_VALUE = {
  name: "",
  number: "",
};

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    onAddContact(values);

    actions.resetForm();
  };

  const onAddContact = (newContact) => {
    const finalContact = {
      ...newContact,
      id: nanoid(),
    };

    dispatch(addContact(finalContact));
  };
  return (
    <Formik
      initialValues={INITIAL_VALUE}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span className={css.title}>Name</span>
          <Field type="text" name="name" className={css.input} />
          <ErrorMessage name="name" component="span" />
        </label>
        <label className={css.label}>
          <span className={css.title}> Number</span>

          <Field type="text" name="number" className={css.input} />
          <ErrorMessage name="number" component="span" />
        </label>
        <button type="submit" className={css.btn}>
          Ad contact
        </button>
      </Form>
    </Formik>
  );
}
