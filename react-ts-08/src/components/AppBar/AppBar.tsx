import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./AppBar.module.css";

import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import { useAppSelector } from "../../redux/store";

export default function AppBar() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
