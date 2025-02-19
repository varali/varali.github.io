import { useState } from "react";
import "./App.css";
import Logo from "./components/Logo";
import Info from "./components/Info";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Logo />

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <Info />
    </>
  );
}

export default App;
