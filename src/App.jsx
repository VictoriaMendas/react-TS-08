import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { refreshUser } from "./redux/auth/operations";
import { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  if (isRefreshing) {
    return <div>Loading...</div>;
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
}

export default App;
