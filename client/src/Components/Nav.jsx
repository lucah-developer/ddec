import React, { useEffect, useState } from "react";
import { Navbar } from "flowbite-react";
import logo from "../Logos&Imágenes/logo.png";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("site-theme");
      if (stored) return stored;
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    applyTheme(theme);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const applyTheme = (t) => {
    const html = document.documentElement;
    if (t === "light") {
      html.setAttribute("data-theme", "light");
    } else {
      html.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("site-theme", t);
    } catch {}
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const textColor = () => {
    if (!scrolled) {
      return "#ffffff"; // letras claras sobre imagen oscura
    }
    if (theme === "light") {
      return "#1f2937"; // gris oscuro para light mode scrolleado
    }
    return "#f1f5f9"; // dark mode letras claras
  };

  const hoverColor = () => {
    if (theme === "light") {
      return "#2563eb"; // azul intenso en light mode
    }
    return "#facc15"; // amarillo en dark mode
  };

  const containerClass = scrolled
    ? "fixed top-0 z-50 w-full shadow-md py-3 transition-all duration-300 border-b"
    : "fixed top-0 z-50 w-full py-3 transition-all duration-300";

  const containerStyle = scrolled
    ? {
        background: theme === "light" ? "#ffffff" : "var(--nav-bg-light)",
        color: textColor(),
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }
    : { background: "transparent", color: textColor(), borderBottom: "none" };

  return (
    <Navbar fluid rounded className={containerClass} style={containerStyle}>
      <div className="flex items-center ml-6">
        <a href="/" className="flex items-center" aria-label="Inicio">
          <img
            src={logo}
            alt="DDEC Logo"
            className={`object-contain transition-all duration-300 ${
              scrolled ? "h-14" : "h-12"
            }`}
            style={
              scrolled
                ? { filter: "none" }
                : { filter: "brightness(0) invert(1) contrast(110%)" }
            }
          />
        </a>
      </div>

      <div className="flex-1 flex justify-end md:justify-end mr-4 items-center gap-4">
        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-6 mr-4">
          {["Inicio", "Obras", "Sobre Nosotros", "Contacto"].map(
            (text, idx) => {
              const hrefs = [
                "/",
                "/#empresasyproyectos",
                "/#about",
                "/#contacto",
              ];
              return (
                <a
                  key={idx}
                  href={hrefs[idx]}
                  className="text-base font-semibold transition-colors"
                  style={{ color: textColor() }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor())}
                  onMouseLeave={(e) => (e.target.style.color = textColor())}
                >
                  {text}
                </a>
              );
            }
          )}
        </nav>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Cambiar tema"
          className="p-2 rounded-md transition-colors"
          style={{ background: "transparent", color: textColor() }}
        >
          {theme === "dark" ? (
            <MdLightMode size={20} />
          ) : (
            <MdDarkMode size={20} />
          )}
        </button>

        {/* Mobile menu toggle */}
        <Navbar.Toggle className="md:hidden" />
      </div>

      {/* Mobile collapse */}
      <Navbar.Collapse className="md:hidden mr-6">
        <a href="/" style={{ color: textColor() }}>
          Inicio
        </a>
        <a href="/#empresasyproyectos" style={{ color: textColor() }}>
          Obras
        </a>
        <a href="/#about" style={{ color: textColor() }}>
          Sobre Nosotros
        </a>
        <a href="/#contacto" style={{ color: textColor() }}>
          Contacto
        </a>
      </Navbar.Collapse>
    </Navbar>
  );
}
