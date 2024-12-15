import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./RegistrationForm.module.css";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
// import { addContact } from "../../redux/contacts/operations";

const INITIAL_VALUE = {
  name: "",
  email: "",
  password: "",
};

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(8, "Too short")
    .max(50, "Too long")
    .required("Required"),
});

export default function RegisterForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    actions.resetForm();

    dispatch(register(values));
  };

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUE}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Username
            <Field type="text" name="name" />
            <ErrorMessage name={"name"} />
          </label>
          <label className={css.label}>
            Email
            <Field type="email" name="email" />
            <ErrorMessage name={"email"} />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" />
            <ErrorMessage name={"password"} />
          </label>
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}
