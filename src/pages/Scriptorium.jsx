import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Scriptorium.module.css";
import Logo from "../components/Logo";

const GOOGLE_FORM_URL = "https://forms.google.com/YOUR_FORM_URL_HERE";

function ScriptoriumNav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const homeLink = isHome ? "#" : "/";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <a href={homeLink} className={styles.navLogo}>✦ feigned poet</a>
        <ul className={styles.navLinks}>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#inquiry" className={styles.navCta}>Cast a Spell</a></li>
        </ul>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "close menu" : "open menu"}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
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
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#services" onClick={() => setMenuOpen(false)}>Services</a></li>
          <li><a href="#process" onClick={() => setMenuOpen(false)}>Process</a></li>
          <li>
            <a href="#inquiry" className={styles.drawerCta} onClick={() => setMenuOpen(false)}>
              Cast a Spell
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default function Scriptorium() {
  const [openService, setOpenService] = useState(null);

  const services = [
    {
      id: "line",
      name: "Line Editing",
      tagline: "Sentence-level refinement of voice, flow, rhythm, and clarity.",
      description:
        "Line editing is for when the story works but the prose needs to sing. I'll polish your sentences for pacing, clarity, and voice — tightening where it drags, smoothing where it stumbles, and making sure your narrative voice comes through on every page.",
      rate: "$0.015 / word",
    },
    {
      id: "copy",
      name: "Copy Editing",
      tagline: "Grammar, consistency, style, and continuity.",
      description:
        "Copy editing catches the mechanical issues — grammar, punctuation, spelling, style consistency, and continuity errors (did your character's eye color change in chapter 12?). I use a detailed style sheet to keep your manuscript internally consistent and ready for proofreading.",
      rate: "$0.012 / word",
    },
    {
      id: "proof",
      name: "Proofreading",
      tagline: "The final polish before publication.",
      description:
        "A last set of careful eyes on your formatted manuscript to catch lingering typos, missing words, and formatting errors before it goes out into the world. This is the service you book right before you hit publish.",
      rate: "$0.007 / word",
    },
  ];

  const steps = [
    {
      n: "01",
      title: "Inquiry",
      desc: "Tell me about your project using the form below.",
    },
    {
      n: "02",
      title: "Sample",
      desc: "For line and copy edits, I offer a free short sample edit (typically the first 1,000 words) so we can both feel out the fit.",
    },
    {
      n: "03",
      title: "Quote & Schedule",
      desc: "I'll send a quote and a proposed timeline based on your word count, service, and deadline.",
    },
    {
      n: "04",
      title: "Contract & Deposit",
      desc: "A simple contract and a small deposit to lock in your spot.",
    },
    {
      n: "05",
      title: "The Work",
      desc: "I edit in tracked changes with margin comments so you can see every suggestion and accept or reject as you see fit.",
    },
    {
      n: "06",
      title: "Delivery",
      desc: "You receive your edited manuscript and a style sheet (for copy edits).",
    },
  ];

  return (
    <div className={styles.page}>
      <ScriptoriumNav />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>✦ editorial services ✦</span>
          <h1 className={styles.heroTitle}>
            The <em>Scriptorium</em>
          </h1>
          <p className={styles.heroTagline}>
            Manuscript polishing for authors who want their words to cast a spell.
          </p>
          <a href="#inquiry" className={styles.heroCta}>
            inquire now
          </a>
        </div>
        <div className={styles.heroCandles}>
          <span className={styles.candle}>🕯️</span>
          <span className={`${styles.candle} ${styles.candleTall}`}>🕯️</span>
          <span className={styles.candle}>🕯️</span>
        </div>
      </section>

      {/* About */}
      <section className={styles.section} id="about">
        <div className={styles.sectionInner}>
          <span className={styles.sectionEyebrow}>✦ about</span>
          <h2 className={styles.sectionHeading}>
            the <em>editor</em>
          </h2>
          <div className={styles.aboutText}>
            <p>
              Hi, I'm Cody — a lifelong reader, devoted bookstagrammer{" "}
              <a
                href="https://instagram.com/faerie.smut"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                @faerie.smut
              </a>
              , and a senior mobile developer by day. When I'm not shipping
              code or losing myself in a new romantasy, I'm editing manuscripts
              for indie authors who want their prose to shine.
            </p>
            <p>
              I bring an editorial eye shaped by thousands of hours of reading
              across genres, a structured and detail-oriented approach, and a
              real love for the craft. I'm currently accepting submissions at
              launch rates while I build my portfolio — so if you've been
              looking for an editor who actually reads what you write, you're
              in the right place.
            </p>
          </div>

          <div className={styles.genreBlock}>
            <span className={styles.genreLabel}>genres I love</span>
            <div className={styles.genreTags}>
              {["Romantasy", "Fantasy", "Romance", "Paranormal", "Urban Fantasy"].map((g) => (
                <span key={g} className={styles.genreTag}>{g}</span>
              ))}
            </div>
            <p className={styles.genreNote}>
              Open to most fiction — if your project falls outside these, reach out anyway.
              I'll let you know honestly if it's a good fit.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={styles.section} id="services">
        <div className={styles.sectionInner}>
          <span className={styles.sectionEyebrow}>✦ services</span>
          <h2 className={styles.sectionHeading}>
            what I <em>offer</em>
          </h2>
          <div className={styles.servicesList}>
            {services.map((svc) => (
              <div
                key={svc.id}
                className={`${styles.serviceRow} ${openService === svc.id ? styles.serviceRowOpen : ""}`}
              >
                <button
                  className={styles.serviceHeader}
                  onClick={() =>
                    setOpenService(openService === svc.id ? null : svc.id)
                  }
                >
                  <div className={styles.serviceHeaderLeft}>
                    <h3 className={styles.serviceName}>{svc.name}</h3>
                    <p className={styles.serviceTagline}>{svc.tagline}</p>
                  </div>
                  <div className={styles.serviceHeaderRight}>
                    <span className={styles.serviceRate}>{svc.rate}</span>
                    <span className={styles.serviceToggle}>
                      {openService === svc.id ? "−" : "+"}
                    </span>
                  </div>
                </button>
                {openService === svc.id && (
                  <div className={styles.serviceBody}>
                    <p className={styles.serviceDesc}>{svc.description}</p>
                    <a href="#inquiry" className={styles.serviceInquire}>
                      inquire about this service →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.turnaround}>
            <span className={styles.turnaroundLabel}>turnaround</span>
            <p className={styles.turnaroundText}>
              Turnaround depends on word count, service, and my current
              schedule. When you submit an inquiry, I'll give you a realistic
              timeline based on your specifics. I take one project at a time
              so your manuscript gets my full attention.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.section} id="process">
        <div className={styles.sectionInner}>
          <span className={styles.sectionEyebrow}>✦ process</span>
          <h2 className={styles.sectionHeading}>
            how it <em>works</em>
          </h2>
          <div className={styles.stepsList}>
            {steps.map((step) => (
              <div key={step.n} className={styles.step}>
                <span className={styles.stepNumber}>{step.n}</span>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section className={styles.section} id="inquiry">
        <div className={styles.sectionInner}>
          <span className={styles.sectionEyebrow}>✦ cast a spell</span>
          <h2 className={styles.sectionHeading}>
            ready to <em>begin?</em>
          </h2>
          <p className={styles.inquiryIntro}>
            Fill out the inquiry form and I'll be in touch within 48 hours.
          </p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.inquiryBtn}
          >
            open inquiry form ✦
          </a>
          <p className={styles.inquiryNote}>
            Opens in a new tab. Fields include: your name, email, manuscript
            title, genre, word count, service, desired deadline, project
            description, and how you heard about me.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerText}>
          © 2026 feigned poet · the scriptorium
        </span>
      </footer>
    </div>
  );
}
