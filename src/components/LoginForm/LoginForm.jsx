import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./LoginForm.module.css";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
// import { addContact } from "../../redux/contacts/operations";

const INITIAL_VALUE = {
  email: "",
  password: "",
};

const UserSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(8, "Too short")
    .max(50, "Too long")
    .required("Required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    actions.resetForm();

    dispatch(logIn(values));
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
            Email
            <Field type="email" name="email" />
            <ErrorMessage name={"email"} />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" />
            <ErrorMessage name={"password"} />
          </label>
          <button type="submit">Log In</button>
        </Form>
      </Formik>
    </div>
  );
}
