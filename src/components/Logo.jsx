import { useLocation } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  const { pathname } = useLocation();
  const href = pathname === "/" ? "#" : "/";

  return (
    <a href={href}>
      <img src="/logo-name.png" alt="feigned poet" className={styles.logo} />
    </a>
  );
}

export default Logo;
