import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import css from "./LoginForm.module.css";
import * as Yup from "yup";
import { LoginCreds as IValue } from "../../@types/auth";
import { logIn } from "../../redux/auth/operations";
import { useAppDispatch } from "../../redux/store";
// import { addContact } from "../../redux/contacts/operations";

const INITIAL_VALUE: IValue = {
  email: "",
  password: "",
};

const UserSchema: Yup.ObjectSchema<IValue> = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(8, "Too short")
    .max(50, "Too long")
    .required("Required"),
});

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: IValue, actions: FormikHelpers<IValue>) => {
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
