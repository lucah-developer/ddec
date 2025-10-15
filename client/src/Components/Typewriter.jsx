// Typewriter.jsx
import React, { useEffect, useState, useRef } from "react";

const Typewriter = ({
  words = ["Empresa Constructora DDEC S.R.L"],
  typingSpeed = 70,
  startDelay = 200,
}) => {
  const text = Array.isArray(words) && words.length ? words[0] : String(words);
  const [display, setDisplay] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const blink = setInterval(() => setShowCursor((v) => !v), 500);
    return () => {
      mounted.current = false;
      clearInterval(blink);
    };
  }, []);

  useEffect(() => {
    if (!mounted.current) return;
    let i = 0,
      timer;
    const start = () => {
      const type = () => {
        if (!mounted.current) return;
        if (i <= text.length) {
          setDisplay(text.slice(0, i));
          i += 1;
          timer = setTimeout(type, typingSpeed);
        } else clearTimeout(timer);
      };
      type();
    };
    timer = setTimeout(start, startDelay);
    return () => clearTimeout(timer);
  }, [text, typingSpeed, startDelay]);

  const highlightWord = (val) => {
    const keyword = "DDEC S.R.L";
    if (!val.includes(keyword)) return val;
    const parts = val.split(keyword);
    return (
      <>
        {parts[0]}
        <span style={{ color: "var(--accent)", fontWeight: 800 }}>
          {keyword}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <span className="inline-flex items-center justify-center">
      <span
        style={{ textShadow: "0 6px 18px rgba(0,0,0,0.6)" }}
        className="text-white font-extrabold"
      >
        {highlightWord(display)}
      </span>

      <span
        aria-hidden
        style={{
          opacity: showCursor ? 1 : 0,
          width: 22,
          height: 2,
          display: "inline-block",
          marginLeft: 10,
          marginBottom: 4,
          background: "var(--accent)",
        }}
      />
    </span>
  );
};

export default Typewriter;
