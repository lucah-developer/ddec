import React, { useEffect, useState } from "react";
import logo from "../Logos&Imágenes/logo.png";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("site-theme");
      if (stored) return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const applyTheme = (t) => {
    const html = document.documentElement;
    if (t === "light") {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    } else {
      html.classList.add("dark");
      html.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("site-theme", t);
    } catch {}
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { href: "/#about", label: "Nosotros" },
    { href: "/#expertise", label: "Especialidad" },
    { href: "/#projects", label: "Proyectos" },
    { href: "/#contact", label: "Contacto" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 glass-nav transition-all duration-300 ${scrolled ? "py-2 shadow-lg" : "py-4"}`}>
      <div className="flex justify-between items-center w-full px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img 
            className="h-10 w-10 object-contain" 
            src={logo} 
            alt="D.D.E.C Logo" 
            style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }}
          />
          <span className="text-2xl font-black tracking-tighter text-slate-100 dark:text-on-background">
            D.D.E.C S.R.L.
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              className="text-slate-300 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider" 
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-white/5 transition-all duration-300 rounded-full"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-primary">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button className="md:hidden p-2 text-on-background">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}