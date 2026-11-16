import { memo, useLayoutEffect, useRef, useState } from "react";
import markLight from "../assets/logo/mark-light.png";
import Intro from "../components/Intro";
import { ArrowRight } from "../components/Icons";
import { projectById, shots } from "../data/projects";
import gsap from "gsap";
import { mountHome, playHero } from "../lib/homeMotion";
import { goClick, removeBoot, setNavLight, siteApi } from "../lib/motion";
import { usePageLifecycle } from "../lib/usePageLifecycle";

const cover = (id) => projectById(id)?.photos[0] || "";

const SERVICES = [
  ["01", "Obra pública e institucional", "Edificios administrativos, museos, bibliotecas y comedores: remodelaciones, ampliaciones y refuerzos para AFIP y la Municipalidad de San Rafael.", cover("museo-lagiglia")],
  ["02", "Vivienda social y desarrollos privados", "Barrios IPV, casas de barrio, edificios de departamentos y residenciales de autor.", cover("edificios-de-altura")],
  ["03", "Infraestructura hídrica", "Canal Sauce La Leona, compuertas del Derivador Matriz y redes cloacales que sostienen el sistema productivo de Mendoza.", cover("compuertas-derivador-matriz")],
  ["04", "Energía e industria", "Fundaciones pesadas para transformadores de alto voltaje, junta elástica de la turbina del Nihuil 2 y reparación del Dique Aisol para Pampa Energía.", cover("junta-elastica-nihuil-2")],
  ["05", "Espacios públicos y urbanismo", "Paseo Pellegrini, Parque de los Niños, plazas y ciclovía: renovación del espacio urbano de San Rafael.", cover("plaza-belgrano")],
  ["06", "Mantenimiento, refuerzos y terminaciones", "Refuerzo estructural de cubiertas, cielorrasos técnicos, núcleos sanitarios y mantenimiento de edificios en uso.", cover("mantenimiento-km0")],
];

const ARCH = [
  {
    no: "01 — Público / Institucional",
    title: <>Administración <span className="serif">AFIP</span></>,
    desc: "Infraestructura fiscal de alto estándar en la región.",
    items: ["AFIP San Luis", "Cielorrasos AFIP", "AFIP San Rafael"],
    to: "/proyectos?c=afip",
    cta: "Ver obras AFIP",
    img: cover("cielorrasos-afip"),
    alt: "Oficinas AFIP San Rafael",
    cap: ["AFIP", "Público / Institucional"],
  },
  {
    no: "02 — Desarrollo urbano",
    title: <>Municipalidad <span className="serif">San Rafael</span></>,
    desc: "Obras públicas que ordenan y mejoran la ciudad.",
    items: ["Museo Humberto Lagiglia", "Paseo Pellegrini", "Parque de los Niños", "Biblioteca M. Moreno", "Comedor Universitario UTN"],
    to: "/proyectos?c=muni",
    cta: "Ver obras municipales",
    img: cover("ciclovia"),
    alt: "Obra de ciclovía en San Rafael",
    cap: ["Municipalidad SRL", "Desarrollo urbano"],
  },
  {
    no: "03 — Vivienda social",
    title: <>IPV <span className="serif">Mendoza</span></>,
    desc: "Barrios pensados para durar y habitar con dignidad.",
    items: ["Barrios IPV San Rafael"],
    to: "/proyectos?c=ipv",
    cta: "Ver barrios IPV",
    img: cover("ipv-san-rafael"),
    alt: "Barrio IPV en construcción",
    cap: ["IPV Mendoza", "Vivienda social"],
  },
  {
    no: "04 — Sector energético",
    title: <>Pampa <span className="serif">Energía</span></>,
    desc: "Ingeniería de precisión para infraestructura crítica.",
    items: ["Base Transformador", "Junta Elástica Nihuil 2", "Agua del Toro", "Reparación Dique Aisol"],
    to: "/proyectos?c=pampa",
    cta: "Ver obras Pampa",
    img: cover("base-transformador-pampa"),
    alt: "Base de transformador Pampa Energía",
    cap: ["Pampa Energía", "Sector energético"],
  },
  {
    no: "05 — Infraestructura hídrica",
    title: <>Irrigación <span className="serif">Provincial</span></>,
    desc: "Obras que sostienen el sistema productivo de Mendoza.",
    items: ["Canal Sauce La Leona", "Compuertas Derivador Matriz"],
    to: "/proyectos?c=irri",
    cta: "Ver obras hídricas",
    img: cover("canal-sauce-la-leona"),
    alt: "Canal de Irrigación",
    cap: ["Irrigación Prov.", "Infraestructura hídrica"],
  },
  {
    no: "06 — Desarrollos de autor",
    title: <>Inversión <span className="serif">privada</span></>,
    desc: "Proyectos privados con la misma rigurosidad técnica.",
    items: ["Residenciales de autor", "Consultorio Casadoro", "Club de Paleta", "Edificios de altura", "Locales comerciales"],
    to: "/proyectos?c=priv",
    cta: "Ver proyectos privados",
    img: shots.privada,
    alt: "Obra privada",
    cap: ["Inversión privada", "Desarrollos de autor"],
  },
];

const GALLERY = [
  [cover("cielorrasos-afip"), "Oficinas AFIP"],
  [cover("pampa-agua-del-toro"), "Pampa Agua del Toro"],
  [cover("plaza-belgrano"), "Plaza Belgrano"],
  [cover("compuertas-derivador-matriz"), "Compuertas Derivador Matriz"],
  [shots.casas, "Casas"],
  [cover("cancha-de-hockey"), "Cancha de hockey"],
  [cover("consultorio-casadoro"), "Consultorio Casadoro"],
  [cover("ciclovia"), "Ciclovía"],
  [cover("museo-lagiglia"), "Museo Humberto Lagiglia"],
  [cover("residenciales-de-autor"), "Casa con pileta"],
  [cover("edificios-de-altura"), "Departamentos Baloffet"],
  [shots.telecom, "Telecom"],
];

const CLIENTS = [
  ["01", "Público / Institucional", "AFIP", "Administración Federal de Ingresos Públicos — San Luis y San Rafael."],
  ["02", "Desarrollo urbano", "Municipalidad de San Rafael", "Obras públicas que ordenan y mejoran la ciudad."],
  ["03", "Vivienda social", "IPV Mendoza", "Barrios pensados para durar y habitar con dignidad."],
  ["04", "Sector energético", "Pampa Energía", "Ingeniería de precisión para infraestructura crítica."],
  ["05", "Infraestructura hídrica", "Irrigación Prov.", "Obras que sostienen el sistema productivo de Mendoza."],
  ["06", "Desarrollos de autor", "Inversión privada", "Proyectos privados con la misma rigurosidad técnica."],
];

function wantsIntro() {
  if (siteApi.static) return false;
  if (document.documentElement.classList.contains("nointro")) return false;
  try {
    if (sessionStorage.getItem("ddec-from") === "1") return false;
  } catch (e) {
    /* ignore */
  }
  return true;
}

function Arrow() {
  return (
    <span className="arr">
      <ArrowRight />
    </span>
  );
}

function ContactForm() {
  const [role, setRole] = useState(0);
  const [ok, setOk] = useState(false);
  const roles = ["Institución pública", "Desarrollador privado", "Industria / energía"];
  return (
    <form
      data-r
      onSubmit={(e) => {
        e.preventDefault();
        setOk(true);
      }}
    >
      <fieldset className="grp" style={{ border: 0 }}>
        <legend className="mono">Sos:</legend>
        <div className="roles" id="roles">
          {roles.map((r, i) => (
            <button key={r} type="button" className={i === role ? "role on" : "role"} onClick={() => setRole(i)}>
              {r}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grp">
        <span className="lg mono">Información personal</span>
        <div className="fields">
          <label className="fld"><input name="nombre" placeholder=" " autoComplete="given-name" /><span>Nombre</span></label>
          <label className="fld"><input name="apellido" placeholder=" " autoComplete="family-name" /><span>Apellido</span></label>
          <label className="fld"><input type="email" name="email" placeholder=" " autoComplete="email" /><span>Correo electrónico</span></label>
          <label className="fld"><input type="tel" name="tel" placeholder=" " autoComplete="tel" /><span>Teléfono</span></label>
          <label className="fld"><input name="empresa" placeholder=" " /><span>Nombre de empresa</span></label>
          <label className="fld"><input name="sector" placeholder=" " /><span>Sector</span></label>
        </div>
      </div>
      <div className="grp">
        <span className="lg mono">Comentarios y preguntas</span>
        <label className="fld full">
          <textarea name="msg" rows={4} placeholder=" " />
          <span>Mensaje</span>
        </label>
      </div>
      <div className="submit">
        <button className="btn btn-red" type="submit">
          <span>Enviar el formulario</span>
          <Arrow />
        </button>
        <small className="ok mono" hidden={!ok}>
          Gracias — (demo) el formulario no envía datos.
        </small>
      </div>
    </form>
  );
}

function Home() {
  const introRef = useRef(null);
  const showIntro = useRef(wantsIntro()).current;

  usePageLifecycle(
    "home",
    () => {
      document.title = "D.D.E.C. S.R.L. — Excelencia estructural. Orgullo regional. · Propuesta de rediseño";
      siteApi.entrance = playHero;
      const root = document.getElementById("top") || document.body;
      return mountHome(root);
    },
    () => {
      setNavLight(false);
      if (!siteApi.static) {
        gsap.set("#heroH1 .ln-in", { y: 0, yPercent: 115 });
        gsap.set("#hero [data-heroin]", { y: 18, opacity: 0 });
      }
      if (showIntro) siteApi.deferEntrance = true;
      else removeBoot();
    }
  );

  useLayoutEffect(() => {
    if (showIntro) introRef.current?.start();
  }, [showIntro]);

  return (
    <>
      {showIntro ? <Intro ref={introRef} /> : null}
      <HomeMain />
    </>
  );
}

function HomeMain() {
  return (
    <main id="top">
      <section className="hero" id="hero" data-nav="dark">
        <div className="hero-bg" id="heroBg">
          <img src={cover("comedor-utn")} alt="Estructura metálica en obra — Comedor Universitario UTN, San Rafael" />
        </div>
        <div className="hero-grid" />
        <div className="hero-top" data-heroin>
          <b>San Rafael, Mendoza</b>
          34.6177° S · 68.3301° O
        </div>
        <div className="wrap hero-in">
          <div className="hero-tag" data-heroin>
            <i />
            Diseño · Desarrollo · Estructuras civiles
          </div>
          <h1 id="heroH1" aria-label="Excelencia estructural. Orgullo regional.">
            <span className="ln"><span className="ln-in">Excelencia <span className="serif">estructural.</span></span></span>
            <span className="ln"><span className="ln-in">Orgullo <span className="serif">regional.</span></span></span>
          </h1>
        </div>
        <div className="hero-bar" data-heroin>
          <div className="wrap">
            <p>Desarrollo, cálculo y<br />construcción de obras civiles</p>
            <p className="mid">Obra pública · Vivienda social · Energía · Infraestructura hídrica · Inversión privada</p>
            <div className="scroll mono"><span>Scroll</span><i /></div>
          </div>
        </div>
      </section>

      <section className="statement" data-nav="light">
        <div className="wrap">
          <p className="eyebrow" data-r>(01) Nosotros</p>
          <p className="big" data-copy data-block="#c1121f">
            Diseñamos infraestructuras que sostienen <span className="serif">comunidades</span> e impulsan el progreso <span className="serif">industrial.</span>
          </p>
          <div className="row">
            <p data-r>D.D.E.C. S.R.L. es una empresa de ingeniería civil de San Rafael, Mendoza: desde edificios públicos y barrios hasta obras de energía e infraestructura hídrica.</p>
            <div className="line-k" data-r>
              {["AFIP", "IPV Mendoza", "Irrigación", "Municipalidad", "Pampa Energía", "Privados"].map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="nosotros" data-nav="light">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-media" data-r>
              <div className="about-frame">
                <img id="aboutImg" src={shots.terminado} alt="Obra de infraestructura terminada" />
              </div>
              <div className="about-badge">
                <b data-count="25" data-suffix="+">25+</b>
                <span>Años de rigor<br />en ingeniería</span>
              </div>
              <div className="about-cap mono"><span>Infraestructura</span><span>Obra terminada</span></div>
            </div>
            <div className="about-copy">
              <p className="eyebrow">Lo que nos distingue</p>
              <h2 className="h-lg" data-copy data-block="#0d0d0c">La base de la <span className="serif">confiabilidad</span></h2>
              <div className="txt">
                <p data-r>Desde nuestra fundación, D.D.E.C. S.R.L. se ha mantenido como un referente de precisión técnica en la región de Mendoza. Nuestro compromiso con la ingeniería civil va más allá de la construcción: diseñamos infraestructuras que sostienen comunidades e impulsan el progreso industrial.</p>
                <p data-r>Con un profundo conocimiento de los requisitos sísmicos y la geología regional, nuestro equipo de ingenieros garantiza que cada proyecto, desde edificios gubernamentales hasta complejos industriales, cumpla con los más altos estándares de seguridad y durabilidad.</p>
              </div>
            </div>
          </div>
          <div className="stats" data-r>
            <div className="stat"><b><span data-count="25">25</span><sup>+</sup></b><span>Años de trayectoria<br />en ingeniería</span></div>
            <div className="stat"><b data-count="36" data-pad="2">36</b><span>Obras documentadas<br />en el portfolio</span></div>
            <div className="stat"><b data-count="6" data-pad="2">06</b><span>Líneas de clientes:<br />público, vivienda, energía…</span></div>
            <div className="stat"><b>1</b><span>Base: San Rafael,<br />Mendoza</span></div>
          </div>
        </div>
      </section>

      <section className="services dark" id="capacidades" data-nav="dark">
        <div className="wrap">
          <div className="sv-head">
            <div>
              <p className="eyebrow">(02) Capacidades</p>
              <h2 className="h-lg" data-copy data-block="#c1121f">Del cálculo a la <span className="serif">obra terminada.</span></h2>
            </div>
            <p data-r>Seis frentes de trabajo, una misma exigencia técnica. Todo lo que mostramos está construido por D.D.E.C.</p>
          </div>
          <div className="sv-list">
            {SERVICES.map(([n, t, d, img]) => (
              <div className="sv-row" data-r key={n}>
                <span className="sv-n">{n}</span>
                <h3 className="sv-t">{t}</h3>
                <p className="sv-d">{d}</p>
                <div className="sv-img"><img src={img} alt="" loading="lazy" /></div>
                <span className="sv-ar"><ArrowRight /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="projects" id="proyectos" data-nav="light">
        <div className="wrap pj-head">
          <p className="eyebrow">(03) Trabajos representativos</p>
          <h2 className="h-xl" data-copy data-block="#c1121f">Nuestros recientes <span className="serif">logros</span></h2>
        </div>
        <div className="arch" id="arch">
          <div className="arch__left">
            {ARCH.map((a) => (
              <div className="arch__info" key={a.no}>
                <span className="no">{a.no}</span>
                <h3>{a.title}</h3>
                <p className="desc">{a.desc}</p>
                <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <a className="btn btn-ink" href={a.to} onClick={goClick({ to: a.to, label: "Proyectos" })}>
                  <span>{a.cta}</span>
                  <Arrow />
                </a>
              </div>
            ))}
          </div>
          <div className="arch__right">
            <div className="pj-counter"><b id="pjNum">01</b><span>/ 06</span></div>
            {ARCH.map((a) => (
              <div className="img-wrapper" key={a.alt}>
                <img src={a.img} alt={a.alt} />
                <div className="cap"><span>{a.cap[0]}</span><span>{a.cap[1]}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="pj-end" />
      </section>

      <section className="obras" id="obras" data-nav="dark">
        <div className="block block--intro">
          <figure className="media">
            <img className="media__image" src={cover("playon-ballofet")} alt="Hormigonado de un playón deportivo" />
            <figcaption className="media__caption">Obras reales, hechas en San Rafael y Mendoza</figcaption>
          </figure>
        </div>
        <div className="block block--main">
          <div className="block__wrapper">
            <div className="content">
              <h2 className="content__title">36 obras. Una sola forma de <span className="serif">construir.</span></h2>
              <p className="content__description">Edificios públicos, viviendas, plazas, energía e infraestructura hídrica. Un portfolio de obras reales.</p>
              <a className="content__button" href="/proyectos" onClick={goClick({ to: "/proyectos", label: "Proyectos" })}>
                Ver portfolio completo <span>→</span>
              </a>
            </div>
            <div className="gallery">
              <ul className="gallery__grid">
                {GALLERY.map(([src, alt]) => (
                  <li className="gallery__item" key={alt}>
                    <img className="gallery__image" src={src} alt={alt} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="clients" id="clientes" data-nav="light">
        <div className="wrap">
          <div className="cl-head">
            <div>
              <p className="eyebrow">(04) Quiénes confían en nosotros</p>
              <h2 className="h-lg" data-copy data-block="#0d0d0c">Instituciones, energía y <span className="serif">desarrolladores.</span></h2>
            </div>
            <p data-r>Trabajamos para organismos públicos, empresas de energía e inversores privados con el mismo nivel de exigencia.</p>
          </div>
        </div>
        <div className="marq" aria-hidden="true">
          <div className="marq-track" id="marq">
            {["AFIP", "IPV Mendoza", "Irrigación", "Municipalidad de San Rafael", "Pampa Energía", "Inversión privada", "AFIP", "IPV Mendoza", "Irrigación", "Municipalidad de San Rafael", "Pampa Energía", "Inversión privada"].map((n, i) => (
              <span key={n + i} className={i % 2 ? "o" : undefined}>{n}</span>
            ))}
          </div>
        </div>
        <div className="wrap">
          <div className="cl-grid">
            {CLIENTS.map(([n, sector, name, text]) => (
              <div className="cl-cell" data-r key={n}>
                <div className="k mono"><span>{n}</span><span>{sector}</span></div>
                <h4>{name}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="values" data-nav="light">
        <div className="wrap vl-grid">
          <div>
            <p className="eyebrow">(05) Cómo trabajamos</p>
            <h2 className="h-lg" data-copy data-block="#c1121f">Rigor técnico, de punta a <span className="serif">punta.</span></h2>
            <p className="vl-quote" data-r>“Coordinamos con rigor técnico, control de costos y plazos claros, desde el primer intercambio hasta la ejecución.”</p>
          </div>
          <div className="vl-list" data-r>
            {[
              ["01", "Integridad", "Honestidad en cada cálculo y contrato."],
              ["02", "Precisión", "Exactitud matemática en todos los diseños estructurales."],
              ["03", "Control de costos", "Seguimiento claro desde el primer intercambio hasta la ejecución."],
              ["04", "Plazos claros", "Plazos definidos con claridad desde el inicio."],
            ].map(([n, t, d]) => (
              <div className="vl-item" key={n}><i>{n}</i><h4>{t}</h4><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-sec" data-nav="dark">
        <img className="cta-mark" src={markLight} alt="" />
        <div className="wrap">
          <p className="eyebrow">(06) ¿Tenés una obra en mente?</p>
          <h2 data-copy data-block="#0d0d0c">Trabajemos <span className="serif">juntos.</span></h2>
          <div className="cta-row">
            <p data-r>Contanos el alcance de tu obra. Coordinamos con rigor técnico, control de costos y plazos claros.</p>
            <a href="/#contacto" className="btn btn-ink" data-r onClick={goClick({ to: "/", hash: "contacto", label: "Contacto" })}>
              <span>Escribinos</span>
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="contact dark" id="contacto" data-nav="dark">
        <div className="wrap ct-grid">
          <div className="ct-info">
            <p className="eyebrow">Contacto</p>
            <h2 className="h-lg" data-copy data-block="#c1121f">Hablemos de tu <span className="serif">proyecto.</span></h2>
            <dl>
              <div data-r><dt className="mono">Correo electrónico</dt><dd><a href="mailto:info@ddec.com.ar">info@ddec.com.ar</a></dd></div>
              <div data-r><dt className="mono">Teléfono</dt><dd><a href="tel:+542604448921">+54 260 444 8921</a></dd></div>
              <div data-r><dt className="mono">Dirección</dt><dd>Av. Mitre 1250<br />San Rafael, Mendoza</dd></div>
            </dl>
            <div className="map" data-r>
              <svg viewBox="0 0 600 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <pattern id="ddec-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0V40" fill="none" stroke="rgba(244,241,234,.07)" />
                  </pattern>
                </defs>
                <rect width="600" height="230" fill="url(#ddec-grid)" />
                <g fill="none" stroke="rgba(244,241,234,.22)" strokeWidth="1.2">
                  <path d="M-10 150 L610 90" />
                  <path d="M-10 60 L610 40" />
                  <path d="M120 -10 L160 240" />
                  <path d="M300 -10 L330 240" />
                  <path d="M470 -10 L430 240" />
                </g>
                <g fill="none" stroke="rgba(244,241,234,.45)" strokeWidth="2.4">
                  <path d="M-10 118 L610 118" />
                </g>
                <circle cx="300" cy="117" r="36" fill="rgba(193,18,31,.14)" />
                <circle cx="300" cy="117" r="7" fill="#c1121f" />
                <circle cx="300" cy="117" r="16" fill="none" stroke="#c1121f" strokeWidth="1.2" />
              </svg>
              <span className="pin mono">San Rafael, Mendoza · 34.6177° S · 68.3301° O</span>
              <a className="open mono" href="https://www.openstreetmap.org/?mlat=-34.6177&mlon=-68.3301#map=16/-34.6177/-68.3301" target="_blank" rel="noopener noreferrer">Abrir mapa ↗</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}

export default memo(Home);
