import { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Schedule from "./pages/Schedule";
import Journal from "./pages/Journal";
import Sanctum from "./pages/Sanctum";
import Reviews from "./pages/Reviews";
import LoginModal from "./components/LoginModal";
import { useSpellCode } from "./hooks/useSpellCode";
import { useAuth } from "./hooks/useAuth";
import styles from "./App.module.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ isAuthed, children }) {
  if (!isAuthed) return <Navigate to="/" replace />;
  return children;
}

function AppContent() {
  const { isAuthed, login, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const handleLogin = useCallback((password) => {
    const success = login(password);
    if (success) navigate("/sanctum");
    return success;
  }, [login, navigate]);

  useSpellCode(openModal);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="reviews" element={<Reviews />} />
        <Route
          path="sanctum"
          element={
            <ProtectedRoute isAuthed={isAuthed}>
              <Sanctum onLogout={logout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="schedule"
          element={
            <ProtectedRoute isAuthed={isAuthed}>
              <Schedule onLogout={logout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="journal"
          element={
            <ProtectedRoute isAuthed={isAuthed}>
              <Journal onLogout={logout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <footer className={styles.footer}>
        <span className={styles.footerLeft}>
          © 2026 feigned poet
        </span>
        <button
          className={styles.footerGlyph}
          onClick={openModal}
          aria-label="sanctum entrance"
        >
          ✦
        </button>
      </footer>

      <LoginModal
        isOpen={modalOpen}
        onClose={closeModal}
        onLogin={handleLogin}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
