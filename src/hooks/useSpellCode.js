import { useEffect, useRef } from "react";

const SPELL = "spell";

export function useSpellCode(onMatch) {
  const bufferRef = useRef("");

  useEffect(() => {
    function handleKeyDown(e) {
      bufferRef.current += e.key.toLowerCase();

      if (bufferRef.current.length > SPELL.length) {
        bufferRef.current = bufferRef.current.slice(-SPELL.length);
      }

      if (bufferRef.current === SPELL) {
        bufferRef.current = "";
        onMatch();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onMatch]);
}
