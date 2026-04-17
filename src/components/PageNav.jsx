import { useLocation } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const link = (anchor) => isHome ? `#${anchor}` : `/#${anchor}`;

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <a href={link("about")}>About</a>
        </li>
        <li>
          <a href={link("reviews")}>Reviews</a>
        </li>
        <li>
          <a href={link("projects")}>Projects</a>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
