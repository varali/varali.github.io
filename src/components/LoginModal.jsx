import { useState, useEffect, useRef } from "react";
import styles from "./LoginModal.module.css";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    const success = onLogin(password);
    if (success) {
      onClose();
    } else {
      setError(true);
      setShaking(true);
      setPassword("");
      setTimeout(() => setShaking(false), 500);
    }
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${shaking ? styles.shake : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.glyph}>✦</div>
        <h2 className={styles.heading}>enter the sanctum</h2>
        <p className={styles.subheading}>this space is not for everyone</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="speak the word"
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            autoComplete="off"
          />
          {error && (
            <p className={styles.errorMsg}>that is not the word</p>
          )}
          <button type="submit" className={styles.button}>
            enter
          </button>
        </form>

        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
