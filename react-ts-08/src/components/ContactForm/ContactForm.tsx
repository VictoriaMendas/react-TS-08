import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { nanoid } from "nanoid";

import { addContact } from "../../redux/contacts/operations";
import { useAppDispatch } from "../../redux/store";
import { Contact } from "../../@types/contacts";
import { FC } from "react";

interface IValues {
  name: string;
  number: string;
}
const ContactSchema: Yup.ObjectSchema<IValues> = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const ContactForm: FC = () => {
  const dispatch = useAppDispatch();
  const INITIAL_VALUE: IValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values: IValues, actions: FormikHelpers<IValues>) => {
    onAddContact(values);

    actions.resetForm();
  };

  const onAddContact = (newContact: IValues) => {
    const finalContact: Contact = {
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
      {() => (
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
      )}
    </Formik>
  );
};

// const ContactForm: React.FC = () => {
//   const handleSubmit = (
//     values: IValues,
//     actions: {
//       setSubmitting: (isSubmitting: boolean) => void;
//       resetForm: () => void;
//     }
//   ) => {
//     // Симуляція запиту на сервер
//     setTimeout(() => {
//       console.log("Form submitted:", values);
//       actions.setSubmitting(false); // Завершення стану відправки
//       actions.resetForm(); // Очистити форму, якщо потрібно
//     }, 2000);
//   };

//   const INITIAL_VALUES: IValues = {
//     name: "",
//     number: "",
//   };

//   return (
//     <Formik
//       initialValues={INITIAL_VALUES}
//       validationSchema={ContactSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }: { isSubmitting: boolean }) => (
//         <Form>
//           <label>
//             <span>Name</span>
//             <Field type="text" name="name" />
//             <ErrorMessage name="name" component="span" />
//           </label>
//           <label>
//             <span>Number</span>
//             <Field type="text" name="number" />
//             <ErrorMessage name="number" component="span" />
//           </label>
//           <button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Submitting..." : "Add contact"}
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

export default ContactForm;
