import styles from "./Logo.module.css";

function Logo() {
  return (
    <a href="#">
      <img src="/logo-name.png" alt="Cody Nixon logo" className={styles.logo} />
    </a>
  );
}

export default Logo;
