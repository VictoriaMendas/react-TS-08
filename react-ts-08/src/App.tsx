import { Route, Routes } from "react-router-dom";

import { refreshUser } from "../src/redux/auth/operations";
import { useEffect, lazy } from "react";

import { selectIsRefreshing } from "../src/redux/auth/selectors";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "../src/components/PrivateRoute/PrivateRoute";
import Layout from "./components/Layout/Layout";
import { useAppDispatch, useAppSelector } from "./redux/store";

const ContactsPage = lazy(
  () => import("../src/pages/ContactsPage/ContactsPage")
);
const HomePage = lazy(() => import("../src/pages/HomePage/HomePage"));
const RegistrationPage = lazy(
  () => import("../src/pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../src/pages/LoginPage/LoginPage"));

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  if (isRefreshing) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegistrationPage />}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          ></Route>
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          ></Route>
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
