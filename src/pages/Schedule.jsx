import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Schedule.module.css";

const STORAGE_KEY = "fp_schedule";

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Schedule({ onLogout }) {
  const [items, setItems] = useState(loadItems);
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [dragId, setDragId] = useState(null);
  const dragOverId = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function handleAdd(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const newItem = {
      id: generateId(),
      text: text.trim(),
      time: time.trim(),
      done: false,
    };
    setItems((prev) => [newItem, ...prev]);
    setText("");
    setTime("");
    inputRef.current?.focus();
  }

  function handleToggle(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleClearAll() {
    if (window.confirm("Start fresh? This will clear all items.")) {
      setItems([]);
    }
  }

  function handleDragStart(id) {
    setDragId(id);
  }

  function handleDragOver(e, id) {
    e.preventDefault();
    dragOverId.current = id;
  }

  function handleDrop() {
    if (!dragId || dragOverId.current === dragId) {
      setDragId(null);
      return;
    }
    setItems((prev) => {
      const unchecked = prev.filter((i) => !i.done);
      const checked = prev.filter((i) => i.done);
      const fromIdx = unchecked.findIndex((i) => i.id === dragId);
      const toIdx = unchecked.findIndex((i) => i.id === dragOverId.current);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const reordered = [...unchecked];
      const [moved] = reordered.splice(fromIdx, 1);
      reordered.splice(toIdx, 0, moved);
      return [...reordered, ...checked];
    });
    setDragId(null);
    dragOverId.current = null;
  }

  const unchecked = items.filter((i) => !i.done);
  const checked = items.filter((i) => i.done);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navBack}>← home</Link>
        <span className={styles.navTitle}>sanctum</span>
        <div className={styles.navRight}>
          <Link to="/journal" className={styles.navLink}>journal</Link>
          <button onClick={onLogout} className={styles.navLink}>logout</button>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>✦ schedule</p>
            <h1 className={styles.heading}>{today}</h1>
          </div>
          {items.length > 0 && (
            <button className={styles.clearBtn} onClick={handleClearAll}>
              start fresh
            </button>
          )}
        </div>

        <form onSubmit={handleAdd} className={styles.form}>
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="add an item..."
            className={styles.textInput}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={styles.timeInput}
          />
          <button type="submit" className={styles.addBtn}>add</button>
        </form>

        {items.length === 0 && (
          <p className={styles.empty}>nothing here yet. add something above.</p>
        )}

        <ul className={styles.list}>
          {unchecked.map((item) => (
            <li
              key={item.id}
              className={`${styles.item} ${dragId === item.id ? styles.dragging : ""}`}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={(e) => handleDragOver(e, item.id)}
              onDrop={handleDrop}
            >
              <span className={styles.dragHandle}>⠿</span>
              <button
                className={styles.checkbox}
                onClick={() => handleToggle(item.id)}
                aria-label="mark done"
              />
              {item.time && (
                <span className={styles.timeTag}>{item.time}</span>
              )}
              <span className={styles.itemText}>{item.text}</span>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(item.id)}
                aria-label="delete"
              >
                ✕
              </button>
            </li>
          ))}

          {checked.length > 0 && unchecked.length > 0 && (
            <li className={styles.divider}>
              <span>completed</span>
            </li>
          )}

          {checked.map((item) => (
            <li key={item.id} className={`${styles.item} ${styles.itemDone}`}>
              <span className={styles.dragHandle} />
              <button
                className={`${styles.checkbox} ${styles.checkboxDone}`}
                onClick={() => handleToggle(item.id)}
                aria-label="mark undone"
              />
              {item.time && (
                <span className={styles.timeTag}>{item.time}</span>
              )}
              <span className={styles.itemText}>{item.text}</span>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(item.id)}
                aria-label="delete"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
