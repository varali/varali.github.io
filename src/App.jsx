import Info from "./components/Info";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Schedule from "./pages/Schedule";
import Journal from "./pages/Journal";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(function () {
    console.log("service worker registered");
  });
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="journal" element={<Journal />} />
          <Route path="app" element={<AppLayout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Info />
    </>
  );
}

export default App;
