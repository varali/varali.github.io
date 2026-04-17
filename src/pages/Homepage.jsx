import { useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import ReviewCard from "../components/ReviewCard";
import { recentReviews } from "../data/reviews";

const stoicQuotes = [
  "Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present. -Marcus Aurelius",
  "Waste no more time arguing about what a good man should be. Be one. -Marcus Aurelius",
  "I have to die. If it is now, well then I die now; if later, then now I will take my lunch, since the hour for lunch has arrived - and dying I will tend to later. -Epictetus",
  "How much worse are the consequences of anger than that which caused it. -Marcus Aurelius",
  "If someone is able to show me that what I think or do is not right, I will happily change, for I seek the truth, by which no one was ever truly harmed. -Marcus Aurelius",
  "Until we have begun to go without them, we fail to realize how unnecessary many things are. -Seneca",
  "We have power over our minds, not outside events. Realize this and you will find strength. -Marcus Aurelius",
  "If it is not right, do not do it, if it is not true, do not say it. -Marcus Aurelius",
  "Wealth consists not in having great possessions but in having few wants. -Epictetus",
  "We suffer more often in our imagination than reality. -Seneca",
  "It is not about how long you live but how well you live. Life is long enough if you live it well. -Seneca",
  "Death smiles at us all; all a man can do is smile back. -Marcus Aurelius",
  "If you are distressed by anything external, the pain is not due to the thing itself but to your estimate of it; and this you have the power to revoke at any moment. -Marcus Aurelius",
  "First say to yourself what you would be; and then do what you have to do. -Epictetus",
  "The soul becomes dyed with the color of its thoughts. -Marcus Aurelius",
  "It never ceases to amaze me: we all love ourselves more than other people, but care more about their opinion than our own. -Marcus Aurelius",
];

const stars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  duration: `${2 + Math.random() * 4}s`,
  delay: `${Math.random() * 4}s`,
}));

export default function Homepage() {
  const quote = useMemo(
    () => stoicQuotes[Math.floor(Math.random() * stoicQuotes.length)],
    []
  );

  return (
    <main className={styles.homepage}>
      <PageNav />

      <div className={styles.starField}>
        {stars.map((s) => (
          <span
            key={s.id}
            className={styles.star}
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: s.duration,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      <section className={styles.hero}>
        <span className={styles.eyebrow}>
          ✦ building worlds by day · escaping them by night ✦
        </span>

        <h1 className={styles.name}>
          feigned <em>poet</em>
        </h1>

        <div className={styles.divider}>✦</div>

        <blockquote className={styles.quote}>{quote}</blockquote>

        <div className={styles.tags}>
          <span className={styles.tag}>iOS SDK</span>
          <span className={styles.tag}>AR Navigation</span>
          <span className={styles.tag}>Romantasy</span>
          <span className={styles.tag}>Bookstagram</span>
          <span className={styles.tag}>@feignedpoet</span>
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className={styles.aboutImage}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.imagePlaceholderGlyph}>✦</span>
          </div>
        </div>
        <div className={styles.aboutContent}>
          <span className={styles.sectionEyebrow}>✦ about</span>
          <h2 className={styles.sectionHeading}>
            who conjures <em>here</em>
          </h2>
          <div className={styles.aboutText}>
            <p>
              I&apos;m Cody — a senior mobile developer by day and a romantasy
              reader by night, living somewhere in the overlap between clean
              code and chaotic fiction.
            </p>
            <p>
              On the dev side, I work on indoor navigation, IoT systems, and
              consumer electronics — building the kind of invisible
              infrastructure that makes apps accessible and speak every
              language.
            </p>
            <p>
              On the reading side, I run{" "}
              <a
                href="https://instagram.com/faerie.smut"
                target="_blank"
                rel="noreferrer"
                className={styles.aboutLink}
              >
                @faerie.smut
              </a>{" "}
              — a bookstagram and content hub for romantasy lovers with taste.
              I post reviews, memes, and the occasional unhinged take on books
              that wrecked me. You can also find me on{" "}
              <a
                href="https://www.tiktok.com/@faerie.smut"
                target="_blank"
                rel="noreferrer"
                className={styles.aboutLink}
              >
                TikTok
              </a>
              ,{" "}
              <a
                href="https://fable.co/fabler/faeriesmut-135289789263?tab=stats&period_type=year"
                target="_blank"
                rel="noreferrer"
                className={styles.aboutLink}
              >
                Fable
              </a>
              , and{" "}
              <a
                href="https://www.goodreads.com/user/show/140371366-cody-nixon"
                target="_blank"
                rel="noreferrer"
                className={styles.aboutLink}
              >
                Goodreads
              </a>
              .
            </p>
            <p>
              When I&apos;m not writing code or consuming books at an
              irresponsible rate, I&apos;m out skating, on a very long walk
              with no particular destination, crocheting something I&apos;ll
              probably never finish, or writing bad poetry. My cat remains
              unimpressed by all of it.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.reviewsTeaser} id="reviews">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>✦ the spellbook</span>
            <h2 className={styles.sectionHeading}>
              recent <em>reviews</em>
            </h2>
          </div>
          <Link to="/reviews" className={styles.seeAll}>
            see all reviews →
          </Link>
        </div>

        {recentReviews.length === 0 ? (
          <p className={styles.reviewsEmpty}>reviews coming soon.</p>
        ) : (
          <div className={styles.reviewsGrid}>
            {recentReviews.map((review) => (
              <ReviewCard key={review.title} review={review} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.projects} id="projects">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>✦ projects</span>
            <h2 className={styles.sectionHeading}>
              things I&apos;ve <em>built</em>
            </h2>
          </div>
          <a
            href="https://github.com/varali"
            target="_blank"
            rel="noreferrer"
            className={styles.seeAll}
          >
            github →
          </a>
        </div>

        <div className={styles.projectsList}>
          <a
            href="https://github.com/varali/varali.github.io"
            target="_blank"
            rel="noreferrer"
            className={styles.projectRow}
          >
            <div className={styles.projectInfo}>
              <h3 className={styles.projectName}>this website</h3>
              <p className={styles.projectDesc}>
                a personal hub for dev work and bookstagram content — built with react, vite, and github pages
              </p>
            </div>
            <span className={styles.projectArrow}>→</span>
          </a>

          <a
            href="https://github.com/varali"
            target="_blank"
            rel="noreferrer"
            className={styles.projectRow}
          >
            <div className={styles.projectInfo}>
              <h3 className={styles.projectName}>instagram unfollower tracker</h3>
              <p className={styles.projectDesc}>
                detects unfollows between sessions for bookstagram growth analytics
              </p>
            </div>
            <span className={styles.projectArrow}>→</span>
          </a>

          <div className={styles.projectRow} data-wip>
            <div className={styles.projectInfo}>
              <h3 className={styles.projectName}>
                bookstagram review pipeline
                <span className={styles.wip}>in progress</span>
              </h3>
              <p className={styles.projectDesc}>
                write once in markdown, cross-post to instagram, tiktok, fable, and goodreads automatically
              </p>
            </div>
            <span className={styles.projectArrow}>→</span>
          </div>
        </div>
      </section>
    </main>
  );
}
