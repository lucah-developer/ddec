import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import markLight from "../brand/logo/mark-light.png";
import markDark from "../brand/logo/mark-dark.png";
import { goClick, siteApi } from "../lib/motion";

const LINKS = [
  { href: "/#nosotros", to: "/", hash: "nosotros", label: "Nosotros", n: "01" },
  { href: "/#capacidades", to: "/", hash: "capacidades", label: "Capacidades", n: "02" },
  { href: "/proyectos", to: "/proyectos", hash: "", label: "Proyectos", n: "03" },
  { href: "/#clientes", to: "/", hash: "clientes", label: "Clientes", n: "04" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const onProjects = pathname.startsWith("/proyectos");

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (open) siteApi.stopLenis();
    else if (!document.documentElement.classList.contains("intro-lock")) siteApi.startLenis();
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="nav" id="nav">
        <div className="wrap nav-in">
          <a
            href="/"
            className="brand"
            aria-label="D.D.E.C. S.R.L. — inicio"
            onClick={goClick({ to: "/", hash: "top", label: "D.D.E.C." })}
          >
            <img className="mk-l" src={markLight} alt="" />
            <img className="mk-d" src={markDark} alt="" />
            <span>
              <b>D.D.E.C.</b>
              <small>S.R.L. · San Rafael</small>
            </span>
          </a>
          <ul>
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={l.label === "Proyectos" && onProjects ? "is-current" : undefined}
                  onClick={(e) => {
                    close();
                    goClick({ to: l.to, hash: l.hash, label: l.label })(e);
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/#contacto" className="cta" onClick={goClick({ to: "/", hash: "contacto", label: "Contacto" })}>
            Contactanos <i />
          </a>
          <button
            className="burger"
            id="burger"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <nav className="mmenu" id="mmenu" aria-label="Menú móvil">
        {LINKS.map((l) => (
          <a
            key={l.n}
            className="big"
            href={l.href}
            onClick={(e) => {
              close();
              goClick({ to: l.to, hash: l.hash, label: l.label })(e);
            }}
          >
            <span className="serif">{l.n}</span>
            {l.label}
          </a>
        ))}
        <a
          className="big"
          href="/#contacto"
          onClick={(e) => {
            close();
            goClick({ to: "/", hash: "contacto", label: "Contacto" })(e);
          }}
        >
          <span className="serif">05</span>Contacto
        </a>
        <p className="mono">San Rafael, Mendoza · info@ddec.com.ar</p>
      </nav>
    </>
  );
}
