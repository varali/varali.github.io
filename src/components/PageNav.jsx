import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const link = (anchor) => isHome ? `#${anchor}` : `/#${anchor}`;

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu on escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={styles.nav}>
        <Logo />
        <ul className={styles.desktopLinks}>
          <li><a href={link("about")}>About</a></li>
          <li><a href={link("reviews")}>Reviews</a></li>
          <li><a href={link("projects")}>Projects</a></li>
          <li>
            <a href="/scriptorium" className={styles.scriptoriumLink}>
              The Scriptorium
            </a>
          </li>
        </ul>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "close menu" : "open menu"}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        <button
          className={styles.drawerClose}
          onClick={() => setMenuOpen(false)}
          aria-label="close menu"
        >
          ✕
        </button>
        <ul className={styles.drawerLinks}>
          <li>
            <a href={link("about")} onClick={() => setMenuOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href={link("reviews")} onClick={() => setMenuOpen(false)}>
              Reviews
            </a>
          </li>
          <li>
            <a href={link("projects")} onClick={() => setMenuOpen(false)}>
              Projects
            </a>
          </li>
          <li>
            <a
              href="/scriptorium"
              className={styles.drawerScriptorium}
              onClick={() => setMenuOpen(false)}
            >
              The Scriptorium
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default PageNav;
