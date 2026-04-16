import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { stoicPrompts } from "../data/stoicPrompts";
import styles from "./Journal.module.css";

const JOPLIN_PORT = 41184;
const JOPLIN_TOKEN_KEY = "fp_joplin_token";

function parseMarkdown(text) {
  return text
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hublp])(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "");
}

function getTitle(text) {
  const firstLine = text.trim().split("\n")[0];
  return firstLine.replace(/^#+\s*/, "").slice(0, 60) || "Journal Entry";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Journal({ onLogout }) {
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [promptIdx, setPromptIdx] = useState(
    () => Math.floor(Math.random() * stoicPrompts.length)
  );
  const [joplinToken, setJoplinToken] = useState(
    () => localStorage.getItem(JOPLIN_TOKEN_KEY) || ""
  );
  const [tokenInput, setTokenInput] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [notebooks, setNotebooks] = useState([]);
  const [selectedNotebook, setSelectedNotebook] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!preview) textareaRef.current?.focus();
  }, [preview]);

  useEffect(() => {
    if (!joplinToken) return;
    async function fetchNotebooks() {
      try {
        const res = await fetch(
          `http://localhost:${JOPLIN_PORT}/folders?token=${joplinToken}`
        );
        if (!res.ok) return;
        const data = await res.json();
        setNotebooks(data.items || []);
      } catch {
        // Joplin not running, fail silently
      }
    }
    fetchNotebooks();
  }, [joplinToken]);

  function nextPrompt() {
    setPromptIdx((i) => (i + 1) % stoicPrompts.length);
  }

  function usePrompt() {
    const prompt = stoicPrompts[promptIdx];
    setContent((prev) =>
      prev ? `${prev}\n\n> ${prompt}\n\n` : `> ${prompt}\n\n`
    );
    textareaRef.current?.focus();
  }

  function saveToken() {
    localStorage.setItem(JOPLIN_TOKEN_KEY, tokenInput);
    setJoplinToken(tokenInput);
    setTokenInput("");
    setShowTokenInput(false);
  }

  async function saveToJoplin() {
    if (!joplinToken) {
      setShowTokenInput(true);
      return;
    }

    const title = `${formatDate()} — ${getTitle(content)}`;
    const body = {
      title,
      body: content,
      parent_id: selectedNotebook,
    };

    try {
      setSaveStatus("saving");
      const res = await fetch(
        `http://localhost:${JOPLIN_PORT}/notes?token=${joplinToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error("Joplin returned an error");

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 4000);
    }
  }

  const renderedMarkdown = useMemo(
    () => parseMarkdown(content),
    [content]
  );

  const today = formatDate();

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navBack}>← home</Link>
        <span className={styles.navTitle}>sanctum</span>
        <div className={styles.navRight}>
          <Link to="/schedule" className={styles.navLink}>schedule</Link>
          <button onClick={onLogout} className={styles.navLink}>logout</button>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>✦ journal</p>
            <h1 className={styles.heading}>{today}</h1>
          </div>
          <div className={styles.headerActions}>
            {notebooks.length > 0 && (
              <select
                className={styles.notebookSelect}
                value={selectedNotebook}
                onChange={(e) => setSelectedNotebook(e.target.value)}
              >
                <option value="">no notebook</option>
                {notebooks.map((nb) => (
                  <option key={nb.id} value={nb.id}>
                    {nb.title}
                  </option>
                ))}
              </select>
            )}
            <button
              className={`${styles.actionBtn} ${preview ? styles.actionBtnActive : ""}`}
              onClick={() => setPreview((p) => !p)}
            >
              {preview ? "edit" : "preview"}
            </button>
            <button
              className={`${styles.actionBtn} ${styles.saveBtn} ${saveStatus === "saved" ? styles.saveBtnSuccess : ""} ${saveStatus === "error" ? styles.saveBtnError : ""}`}
              onClick={saveToJoplin}
              disabled={!content.trim() || saveStatus === "saving"}
            >
              {saveStatus === "saving" && "saving..."}
              {saveStatus === "saved" && "✓ saved"}
              {saveStatus === "error" && "joplin unreachable"}
              {!saveStatus && "save to joplin"}
            </button>
          </div>
        </div>

        {showTokenInput && (
          <div className={styles.tokenPrompt}>
            <p className={styles.tokenLabel}>
              enter your joplin web clipper token
              <a
                href="http://localhost:41184"
                target="_blank"
                rel="noreferrer"
                className={styles.tokenHelp}
              >
                (find it in joplin → tools → web clipper)
              </a>
            </p>
            <div className={styles.tokenForm}>
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="paste token here"
                className={styles.tokenInput}
              />
              <button
                className={styles.actionBtn}
                onClick={saveToken}
                disabled={!tokenInput.trim()}
              >
                save token
              </button>
              <button
                className={styles.navLink}
                onClick={() => setShowTokenInput(false)}
              >
                cancel
              </button>
            </div>
          </div>
        )}

        <div className={styles.promptBar}>
          <p className={styles.promptText}>
            <em>{stoicPrompts[promptIdx]}</em>
          </p>
          <div className={styles.promptActions}>
            <button className={styles.promptBtn} onClick={usePrompt}>
              use this
            </button>
            <button className={styles.promptBtn} onClick={nextPrompt}>
              next ↻
            </button>
          </div>
        </div>

        <div className={styles.editor}>
          {preview ? (
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
            />
          ) : (
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="begin writing..."
              spellCheck
            />
          )}
        </div>

        {joplinToken && (
          <button
            className={styles.resetToken}
            onClick={() => {
              localStorage.removeItem(JOPLIN_TOKEN_KEY);
              setJoplinToken("");
            }}
          >
            reset joplin token
          </button>
        )}
      </main>
    </div>
  );
}
