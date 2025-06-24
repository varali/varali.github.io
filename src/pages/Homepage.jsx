import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  const [affirmation, setAffirmation] = useState("Affirmation loading...");
  useEffect(
    function () {
      async function getAffirmation() {
        const url = "https://www.affirmations.dev";
        // const url = "https://icanhazdadjoke.com/";
        // const url = "https://zenquotes.io/api/today";
        const options = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Origin: "https://varali.github.io/",
            "Access-Control-Allow-Origin": "https://varali.github.io/",
          },
          mode: "cors",
        };

        try {
          const response = await fetch(url, options);
          console.log(response);
          const result = await response.text();
          console.log(result);
          setAffirmation(result["affirmation"]);
        } catch (error) {
          console.error(error);
        }
      }
      getAffirmation();
    },
    [setAffirmation]
  );

  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Hi, Cody 😎
          <br />
          Welcome to your day.
        </h1>
        <h2>{affirmation}</h2>
        <Link to="./app" className="cta">
          Let's do it
        </Link>
      </section>
    </main>
  );
}
