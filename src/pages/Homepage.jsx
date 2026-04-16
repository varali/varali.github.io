import { useMemo } from "react";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

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
    </main>
  );
}
