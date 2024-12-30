import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import css from "./RegistrationForm.module.css";
import * as Yup from "yup";

import { RegisterCreds as IValue } from "../../@types/auth";
import { register } from "../../redux/auth/operations";
import { useAppDispatch } from "../../redux/store";

const INITIAL_VALUE: IValue = {
  name: "",
  email: "",
  password: "",
};

const UserSchema: Yup.ObjectSchema<IValue> = Yup.object().shape({
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
  const dispatch = useAppDispatch();

  const handleSubmit = (values: IValue, actions: FormikHelpers<IValue>) => {
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
