import { Link } from "react-router-dom";
import styles from "./Sanctum.module.css";

const greetings = [
  "welcome back.",
  "you made it.",
  "the sanctum awaits.",
  "here you are.",
  "a quiet corner, just for you.",
];

function getGreeting() {
  return greetings[Math.floor(Math.random() * greetings.length)];
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return "good morning";
  if (h < 17) return "good afternoon";
  return "good evening";
}

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export default function Sanctum({ onLogout }) {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navBack}>← home</Link>
        <span className={styles.navTitle}>sanctum</span>
        <button onClick={onLogout} className={styles.navLink}>logout</button>
      </nav>

      <main className={styles.main}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{getTimeOfDay()} · {today}</span>
          <h1 className={styles.heading}>{getGreeting()}</h1>
        </div>

        <div className={styles.cards}>
          <Link to="/schedule" className={styles.card}>
            <span className={styles.cardGlyph}>✦</span>
            <h2 className={styles.cardTitle}>schedule</h2>
            <p className={styles.cardDesc}>
              plan your day, check things off, start fresh tomorrow
            </p>
            <span className={styles.cardArrow}>→</span>
          </Link>

          <Link to="/journal" className={styles.card}>
            <span className={styles.cardGlyph}>✦</span>
            <h2 className={styles.cardTitle}>journal</h2>
            <p className={styles.cardDesc}>
              write, reflect, save to joplin
            </p>
            <span className={styles.cardArrow}>→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
