import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/#about">About</NavLink>
        </li>
        <li>
          <NavLink to="/#reviews">Reviews</NavLink>
        </li>
        <li>
          <NavLink to="/#projects">Projects</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
