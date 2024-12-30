import { Navigate } from "react-router-dom";

import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { FC } from "react";
import { useAppSelector } from "../../redux/store";

/**
 * - If the route is restricted and the user is logged in,
 *  render a <Navigate> to redirectTo
 * - Otherwise render the component
 */
interface Props {
  redirectTo: "/" | "/contacts";
  component: JSX.Element;
}
export const RestrictedRoute: FC<Props> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
