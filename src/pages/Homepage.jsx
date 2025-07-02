import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

const stoicQuotes = [
  "Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present. -Marcus Aurelius",
  "Waste no more time arguing about what a good man should be. Be one. -Marcus Aurelius",
  "I have to die. If it is now, well then I die now; if later, then now I will take my lunch, since the hour for lunch has arrived - and dying I will tend to later. -Epictetus",
  "How much worse are the consequences of anger than that which caused it. -Marcus Aurelius",
  "If someone is able to show me that what I think or do is not right, I will happily change, for I seek the truth, by which no one was ever truly harmed. It is the person who continues in his self-deception and ignorance who is harmed. -Marcus Aurelius",
  "Until we have begun to go without them, we fail to realize how unnecessary many things are. We've been using them not because we needed them but because we had them. -Seneca",
  "We have power over our minds, not outside events. Realize this and you will find strength. -Marcus Aurelius",
  "If it is not right, do not do it, if it is not true, do not say it. -Marcus Aurelius",
  "Wealth consists not in having great possessions but in having few wants. -Epictetus",
  "We suffer more often in our imagination than reality. -Seneca",
  "A man may rule the world and still be unhappy, if he does not feel that he is happy. What does your condition matter, if it is bad in your own eyes? -Seneca",
  "Whatever is implanted by us when we were born can be train and toughened but not overcome. -Seneca",
  "It is not about how long you live but how well you live. Life is long enough if you live it well. -Seneca",
  "Death smiles at us all; all a man can do is smile back. -Marcus Aurelius",
  "If you are distressed by anything external, the pain is not due to the thing itself but to your own estimate of it; and this you have the power to revoke at any moment. -Marcus Aurelius",
  "Look well into thyself; there is a source of strength which will always spring up if thou wilt always look. -Marcus Aurelius",
  "First say to yourself what you would be; and then do what you have to do. -Epictetus",
  "The soul becomes dyed with the color of its thoughts. -Marcus Aurelius",
  "It never ceases to amaze me: we all love ourselves more than other people, but care more about their opinion than our own. -Marcus Aurelius",
];

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Hi, Cody 😎
          <br />
          Welcome to your day.
        </h1>
        <h2>{stoicQuotes[Math.floor(Math.random() * stoicQuotes.length)]}</h2>
        <Link to="./app" className="cta">
          Let&apos;s do it
        </Link>
      </section>
    </main>
  );
}
