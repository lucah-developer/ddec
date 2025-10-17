// Typewriter.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Typewriter simple (single pass). Acepta className para tamaño/responsive.
 */
export default function Typewriter({
  text = "D.D.E.C S.R.L",
  typingSpeed = 110,
  startDelay = 180,
  className = "",
}) {
  const mountedRef = useRef(false);
  const charRef = useRef(0);
  const timeoutRef = useRef(null);

  const [display, setDisplay] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 520);
    return () => clearInterval(id);
  }, []);

  // typing (single pass)
  useEffect(() => {
    mountedRef.current = true;

    const run = () => {
      if (!mountedRef.current) return;
      if (charRef.current < text.length) {
        charRef.current += 1;
        setDisplay(text.slice(0, charRef.current));
        timeoutRef.current = setTimeout(run, typingSpeed);
      } else {
        // finished typing
      }
    };

    timeoutRef.current = setTimeout(run, startDelay);

    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, typingSpeed, startDelay]);

  return (
    <span
      aria-live="polite"
      aria-atomic="true"
      className={`inline-flex items-baseline gap-2 ${className}`}
    >
      {/* Texto tipeado: usando metal-gradient */}
      <span
        className="metal-gradient font-extrabold"
        style={{ fontFamily: "var(--heading-font)", whiteSpace: "pre" }}
      >
        {display}
      </span>

      {/* Cursor underscore ligeramente alineado con baseline */}
      <span
        aria-hidden="true"
        className="typewriter-underscore"
        style={{
          opacity: cursorVisible ? 1 : 0,
        }}
      >
        _
      </span>
    </span>
  );
}
