import "./App.css";
import Logo from "./components/Logo";
import Info from "./components/Info";
import Map from "./components/Map";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(function () {
    console.log("service worker registered");
  });
}

function App() {
  // const mapboxAccessToken =
  //   "pk.eyJ1IjoiY3JuZXdib2xkIiwiYSI6ImNtN2NnYzZrYTBvcHEya3E4cWI0ajFtam0ifQ.macU8rj2--3ACPSKKlZ39g";

  return (
    <>
      <Logo />
      {/* <Map accessToken={mapboxAccessToken} /> */}
      <Info />
    </>
  );
}

export default App;
