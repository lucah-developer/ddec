import markLight from "../assets/logo/mark-light.png";
import { goClick } from "../lib/motion";

const OBRA = [
  ["afip", "AFIP"],
  ["muni", "Municipalidad"],
  ["ipv", "IPV"],
  ["pampa", "Pampa Energía"],
  ["irri", "Irrigación"],
  ["priv", "Privados"],
];

export default function Footer() {
  return (
    <footer data-nav="dark">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <a className="brand" href="/" onClick={goClick({ to: "/", hash: "top", label: "D.D.E.C." })}>
              <img src={markLight} alt="" />
              <span>
                <b style={{ fontSize: 26 }}>D.D.E.C.</b>
                <small>Diseño · Desarrollo · Estructuras civiles</small>
              </span>
            </a>
            <p>Desarrollo, cálculo y construcción de obras civiles. San Rafael, Mendoza.</p>
          </div>
          <div>
            <h5 className="mono">Sitio</h5>
            <ul>
              <li><a href="/#nosotros" onClick={goClick({ to: "/", hash: "nosotros", label: "Nosotros" })}>Nosotros</a></li>
              <li><a href="/#capacidades" onClick={goClick({ to: "/", hash: "capacidades", label: "Capacidades" })}>Capacidades</a></li>
              <li><a href="/proyectos" onClick={goClick({ to: "/proyectos", label: "Proyectos" })}>Proyectos</a></li>
              <li><a href="/#clientes" onClick={goClick({ to: "/", hash: "clientes", label: "Clientes" })}>Clientes</a></li>
            </ul>
          </div>
          <div>
            <h5 className="mono">Obras</h5>
            <ul>
              {OBRA.map(([c, label]) => (
                <li key={c}>
                  <a href={`/proyectos?c=${c}`} onClick={goClick({ to: `/proyectos?c=${c}`, label: "Proyectos" })}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mono">Contacto</h5>
            <ul>
              <li><a href="mailto:info@ddec.com.ar">info@ddec.com.ar</a></li>
              <li><a href="tel:+542604448921">+54 260 444 8921</a></li>
              <li>
                <a href="/#contacto" onClick={goClick({ to: "/", hash: "contacto", label: "Contacto" })}>
                  Av. Mitre 1250, San Rafael
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ft-giant" aria-hidden="true">
          D.D.E.C<em>.</em>
        </div>
        <div className="ft-bot mono">
          <span>© 2026 D.D.E.C. S.R.L. Todos los derechos reservados.</span>
          <span>
            <a href="#legales" onClick={(e) => e.preventDefault()}>Legales</a>
            {" · "}
            <a href="#privacidad" onClick={(e) => e.preventDefault()}>Privacidad</a>
          </span>
          <span>Propuesta de rediseño — Orivon Studio</span>
        </div>
      </div>
    </footer>
  );
}
