import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";

export default function Info() {
  return (
    <footer className="info">
      <p>
        Built with{" "}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>{" "}
        and{" "}
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </p>
    </footer>
  );
}
