import { useLocation } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  const { pathname } = useLocation();
  const href = pathname === "/" ? "#" : "/";

  return (
    <a href={href} className={styles.logo}>
      feigned <em>poet</em>
    </a>
  );
}

export default Logo;
