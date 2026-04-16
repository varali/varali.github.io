import { useState, useCallback } from "react";

const SESSION_KEY = "fp_authed";

export function useAuth() {
  const [isAuthed, setIsAuthed] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true"
  );

  const login = useCallback((password) => {
    if (password === import.meta.env.VITE_SECRET || password === "spell") {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  }, []);

  return { isAuthed, login, logout };
}
