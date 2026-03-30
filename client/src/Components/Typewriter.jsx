// Typewriter.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Typewriter mejorado:
 * - words: array de frases
 * - restartKey: reinicia cuando cambia (p.ej. restartKey={current})
 * - ignorePrefersReducedMotion: forza animación si true
 * - typingSpeed, deletingSpeed, pause, startDelay, loop
 *
 * Corrección clave: al terminar de borrar se avanza inmediatamente a la siguiente frase
 * y se inicia el tipeo (sin quedarse "vacío").
 */

export default function Typewriter({
  words = words,
  restartKey = 0,
  ignorePrefersReducedMotion = false,
  typingSpeed = 110,
  deletingSpeed = 50,
  pause = 1100,
  startDelay = 160,
  loop = true,
}) {
  const mountedRef = useRef(false);
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const deletingRef = useRef(false);
  const timeoutRef = useRef(null);

  const [display, setDisplay] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [running, setRunning] = useState(false);

  // blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 520);
    return () => clearInterval(id);
  }, []);

  // reduced-motion detection
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
  const shouldReduce = prefersReduced && !ignorePrefersReducedMotion;

  useEffect(() => {
    // cleanup any previous timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    mountedRef.current = true;
    wordIndexRef.current = 0;
    charIndexRef.current = 0;
    deletingRef.current = false;
    setDisplay("");
    setRunning(false);

    const list = Array.isArray(words) && words.length ? words : [String(words)];

    if (shouldReduce) {
      // accessibility: show first word only
      setDisplay(list[0]);
      setRunning(false);
      return;
    }

    const run = () => {
      if (!mountedRef.current) return;
      setRunning(true);

      const currentWord = String(list[wordIndexRef.current] ?? "");

      if (!deletingRef.current) {
        // TYPING
        if (charIndexRef.current < currentWord.length) {
          charIndexRef.current += 1;
          setDisplay(currentWord.slice(0, charIndexRef.current));
          // log start once per word
          if (charIndexRef.current === 1)
            console.log("[Typewriter] typing:", currentWord);
          timeoutRef.current = setTimeout(run, typingSpeed);
        } else {
          // finished typing -> pause then start deleting (unless last + no-loop)
          console.log("[Typewriter] finished typing:", currentWord);
          timeoutRef.current = setTimeout(() => {
            const isLast = wordIndexRef.current >= list.length - 1;
            if (!loop && isLast) {
              setRunning(false);
              return;
            }
            deletingRef.current = true;
            timeoutRef.current = setTimeout(run, deletingSpeed);
          }, pause);
        }
      } else {
        // DELETING
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setDisplay(currentWord.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(run, deletingSpeed);
        } else {
          // finished deleting -> advance index and start typing next immediately
          deletingRef.current = false;
          const prevIndex = wordIndexRef.current;
          wordIndexRef.current = loop
            ? (wordIndexRef.current + 1) % list.length
            : Math.min(wordIndexRef.current + 1, list.length - 1);

          console.log(
            "[Typewriter] deleted full word, moving from",
            prevIndex,
            "to",
            wordIndexRef.current
          );

          // reset char index (already 0) and start next run quickly
          charIndexRef.current = 0;

          // small delay before next typing to avoid too harsh jump
          timeoutRef.current = setTimeout(run, Math.max(120, typingSpeed / 2));
        }
      }
    };

    // kick off after initial delay
    timeoutRef.current = setTimeout(run, startDelay);

    return () => {
      // cleanup on unmount or restart
      mountedRef.current = false;
      setRunning(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    // re-run when words content or restartKey or shouldReduce changes
  }, [
    JSON.stringify(words),
    restartKey,
    typingSpeed,
    deletingSpeed,
    pause,
    startDelay,
    loop,
    shouldReduce,
  ]);

  return (
    <span
      aria-live="polite"
      aria-atomic="true"
      className="inline-flex items-baseline gap-2"
    >
      <span
        className="metal-gradient font-extrabold"
        style={{ fontFamily: "var(--heading-font)", whiteSpace: "pre" }}
      >
        {display}
      </span>

      <span
        aria-hidden="true"
        className="typewriter-underscore"
        style={{ opacity: cursorVisible ? 1 : 0 }}
      >
        _
      </span>

      {/* small indicator - green when running */}
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: 8,
          marginLeft: 6,
          background: running ? "#36D399" : "#9CA3AF",
        }}
      />
    </span>
  );
}
