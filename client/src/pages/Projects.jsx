import { memo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDiag, IconGrid, IconList } from "../components/Icons";
import markLight from "../assets/logo/mark-light.png";
import { CLIENTS, PROJECTS, clientByKey, counts, pad2 } from "../data/projects";
import { copyReveal, goClick, navTheme, setNavLight, siteApi } from "../lib/motion";
import { usePageLifecycle } from "../lib/usePageLifecycle";

const COUNT = counts();

function spansFor(n) {
  const spans = [];
  let i = 0;
  let k = 0;
  while (i < n) {
    if (n - i === 1) {
      spans.push("s12");
      break;
    }
    spans.push(k % 2 ? "s5" : "s7", k % 2 ? "s7" : "s5");
    i += 2;
    const rest = Math.min(3, n - i);
    for (let r = 0; r < rest; r += 1) spans.push(rest === 3 ? "s4" : rest === 2 ? "s6" : "s12w");
    i += rest;
    k += 1;
  }
  return spans;
}

function playProjectsHero() {
  if (siteApi.static) return;
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .fromTo("#pgH .ln-in", { y: 0, yPercent: 115 }, { y: 0, yPercent: 0, duration: 1.1, stagger: 0.12 })
    .fromTo("#pgHero [data-heroin]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.8");
}

const ProjectsHero = memo(function ProjectsHero() {
  return (
    <section className="pg-hero" id="pgHero" data-nav="light">
      <div className="wrap">
        <p className="eyebrow" data-heroin>Obra construida · San Rafael, Mendoza</p>
        <h1 className="pg-h h-xl" id="pgH">
          <span className="ln"><span className="ln-in">Proyectos que</span></span>
          <span className="ln"><span className="ln-in"><span className="serif">sostienen</span> la región.</span></span>
        </h1>
        <div className="pg-meta" data-heroin>
          <p>Obras públicas y privadas diseñadas, calculadas y ejecutadas por D.D.E.C. Elegí un cliente para ver su portafolio.</p>
          <div className="pg-stats">
            <div><b>{PROJECTS.length}</b><span className="mono">Proyectos</span></div>
            <div><b>{CLIENTS.length}</b><span className="mono">Clientes</span></div>
          </div>
        </div>
      </div>
    </section>
  );
});

const ProjectsCta = memo(function ProjectsCta() {
  return (
    <section className="cta-pg dark" data-nav="dark">
      <div className="wrap">
        <p className="eyebrow on-dark">Siguiente obra</p>
        <h2 className="h-lg" data-copy data-block="#c1121f">¿Tenés un proyecto <span className="serif">en mente?</span></h2>
        <a href="/#contacto" className="btn btn-light" onClick={goClick({ to: "/", hash: "contacto", label: "Contacto" })}>
          <span>Contanos tu obra</span>
          <i className="arr"><ArrowDiag /></i>
        </a>
      </div>
    </section>
  );
});

function Projects() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("c");
  const key = raw && clientByKey[raw] ? raw : "all";
  const view = params.get("v") === "list" ? "list" : "grid";
  const busy = useRef(false);
  const firstReveal = useRef(true);
  const client = key === "all" ? null : clientByKey[key];
  const visible = PROJECTS.filter((p) => key === "all" || p.client === key);
  const spans = spansFor(visible.length);
  const n = visible.length;

  usePageLifecycle(
    "projects",
    () => {
      document.title = "Proyectos — D.D.E.C. S.R.L. · Propuesta de rediseño";
      siteApi.entrance = playProjectsHero;
      const root = document.getElementById("top") || document.body;
      copyReveal(root);
      navTheme();
      return () => {};
    },
    () => {
      setNavLight(true);
      if (!siteApi.static) {
        gsap.set("#pgH .ln-in", { y: 0, yPercent: 115 });
        gsap.set("#pgHero [data-heroin]", { y: 18, opacity: 0 });
      }
    }
  );

  useEffect(() => {
    if (siteApi.static) return undefined;
    const els = Array.from(document.querySelectorAll(view === "grid" ? "#pgrid .pc" : "#plist .pl"));
    gsap.set(els, { opacity: 0, y: 40 });
    const batch = ScrollTrigger.batch(els, {
      start: "top 94%",
      once: true,
      onEnter: (b) =>
        gsap.to(b, { opacity: 1, y: 0, duration: 0.85, stagger: 0.07, ease: "power3.out", overwrite: true }),
    });
    if (!firstReveal.current) {
      gsap.fromTo(".pf-intro > *", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", overwrite: true });
    }
    firstReveal.current = false;
    return () => batch.forEach((t) => t.kill());
  }, [key, view]);

  useEffect(() => {
    document.body.classList.toggle("view-list", view === "list");
    return () => document.body.classList.remove("view-list");
  }, [view]);

  useEffect(() => {
    if (siteApi.static || !window.matchMedia("(hover:hover)").matches) return undefined;
    const grid = document.getElementById("pgrid");
    const list = document.getElementById("plist");
    const cur = document.getElementById("pcCur");
    const pv = document.getElementById("plPrev");
    const pimg = pv?.querySelector("img");
    if (!grid || !list || !cur || !pv) return undefined;
    gsap.set(cur, { scale: 0 });
    const qx = gsap.quickTo(cur, "x", { duration: 0.45, ease: "power3" });
    const qy = gsap.quickTo(cur, "y", { duration: 0.45, ease: "power3" });
    const px = gsap.quickTo(pv, "x", { duration: 0.6, ease: "power3" });
    const py = gsap.quickTo(pv, "y", { duration: 0.6, ease: "power3" });
    const move = (e) => {
      qx(e.clientX);
      qy(e.clientY);
      px(e.clientX);
      py(e.clientY);
    };
    const overG = (e) => {
      if (e.target.closest(".pc")) {
        gsap.to(cur, { scale: 1, duration: 0.45, ease: "power3", overwrite: "auto" });
        grid.classList.add("hov");
      }
    };
    const leaveG = () => {
      gsap.to(cur, { scale: 0, duration: 0.35, ease: "power3", overwrite: "auto" });
      grid.classList.remove("hov");
    };
    const overL = (e) => {
      const row = e.target.closest(".pl");
      if (!row) return;
      list.classList.add("hov");
      if (row.dataset.img) {
        if (pimg.getAttribute("src") !== row.dataset.img) pimg.src = row.dataset.img;
        pv.classList.add("on");
      } else pv.classList.remove("on");
    };
    const leaveL = () => {
      list.classList.remove("hov");
      pv.classList.remove("on");
    };
    window.addEventListener("mousemove", move, { passive: true });
    grid.addEventListener("mouseover", overG);
    grid.addEventListener("mouseleave", leaveG);
    list.addEventListener("mouseover", overL);
    list.addEventListener("mouseleave", leaveL);
    return () => {
      window.removeEventListener("mousemove", move);
      grid.removeEventListener("mouseover", overG);
      grid.removeEventListener("mouseleave", leaveG);
      list.removeEventListener("mouseover", overL);
      list.removeEventListener("mouseleave", leaveL);
    };
  }, []);

  const applyFilter = (k) => {
    if (busy.current || k === key) return;
    const go = () => {
      const next = new URLSearchParams(params);
      if (k === "all") next.delete("c");
      else next.set("c", k);
      setParams(next, { replace: true });
    };
    if (siteApi.static) {
      go();
      return;
    }
    busy.current = true;
    const sel = view === "grid" ? "#pgrid .pc" : "#plist .pl";
    const cur = Array.from(document.querySelectorAll(sel));
    const body = document.getElementById("pgBody");
    const top = body ? body.getBoundingClientRect().top + window.scrollY - 150 : 0;
    gsap.timeline({
      onComplete: () => {
        busy.current = false;
      },
    })
      .to(cur, { opacity: 0, y: -24, duration: 0.35, stagger: { each: 0.02, amount: 0.25 }, ease: "power2.in" })
      .to(".pf-intro > *", { opacity: 0, y: -10, duration: 0.25 }, 0)
      .add(() => {
        go();
        if (window.scrollY > top + 40) siteApi.scrollTo(top, true);
      });
  };

  const setView = (v) => {
    if (v === view) return;
    const swap = () => {
      const next = new URLSearchParams(params);
      if (v === "list") next.set("v", "list");
      else next.delete("v");
      setParams(next, { replace: true });
    };
    if (siteApi.static) {
      swap();
      return;
    }
    const leaving = document.getElementById(v === "list" ? "pgrid" : "plist");
    gsap.to(leaving, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => {
        swap();
        gsap.set("#pgrid", { opacity: 1 });
        gsap.set("#plist", { opacity: 1 });
      },
    });
  };

  return (
    <main id="top">
      <ProjectsHero />
      <div className="pf" id="pf" data-nav="light">
        <div className="wrap pf-in">
          <div className="pf-chips" id="chips" role="tablist" aria-label="Filtrar por cliente">
            <button className={key === "all" ? "chip on" : "chip"} type="button" role="tab" aria-selected={key === "all"} onClick={() => applyFilter("all")}>
              Todos<sup>{PROJECTS.length}</sup>
            </button>
            {CLIENTS.map((c) => (
              <button
                key={c.key}
                className={key === c.key ? "chip on" : "chip"}
                type="button"
                role="tab"
                aria-selected={key === c.key}
                onClick={() => applyFilter(c.key)}
              >
                {c.label}<sup>{COUNT[c.key]}</sup>
              </button>
            ))}
          </div>
          <div className="pf-view" role="group" aria-label="Vista">
            <button className={view === "grid" ? "vb on" : "vb"} type="button" data-v="grid" aria-label="Vista en grilla" onClick={() => setView("grid")}><IconGrid /></button>
            <button className={view === "list" ? "vb on" : "vb"} type="button" data-v="list" aria-label="Vista en lista" onClick={() => setView("list")}><IconList /></button>
          </div>
        </div>
      </div>
      <section className="pg-body" id="pgBody" data-nav="light">
        <div className="wrap">
          <div className="pf-intro" id="pfIntro">
            <div>
              <span className="mono" id="pfSector">{client ? client.sector : "Todos los clientes"}</span>
              <h2 className="h-md" id="pfName">{client ? client.full : "Portafolio completo"}</h2>
            </div>
            <p id="pfText">
              {client ? client.intro : "Obras ejecutadas para organismos públicos, empresas del sector energético y clientes privados."}
            </p>
            <span className="pf-n mono" id="pfN">{pad2(n)} {n === 1 ? "proyecto" : "proyectos"}</span>
          </div>
          <div className="pgrid" id="pgrid" hidden={view !== "grid"}>
            {visible.map((p, i) => {
              const c = clientByKey[p.client];
              const has = p.photos.length > 0;
              return (
                <a
                  className={`pc ${spans[i] || ""}`}
                  key={p.id}
                  href={`/proyectos/${p.id}`}
                  onClick={goClick({ to: `/proyectos/${p.id}`, label: p.title })}
                >
                  <div className={has ? "pc-img" : "pc-img noimg"}>
                    {has ? (
                      <img src={p.photos[0]} alt={p.title} loading={i < 6 ? "eager" : "lazy"} decoding="async" />
                    ) : (
                      <>
                        <img className="nomark" src={markLight} alt="" />
                        <span className="mono">Registro fotográfico en preparación</span>
                      </>
                    )}
                    <div className="pc-tags">
                      {p.tags.slice(0, 2).map((t) => <i className="mono" key={t}>{t}</i>)}
                    </div>
                    <span className="pc-ar"><ArrowDiag /></span>
                  </div>
                  <div className="pc-info">
                    <span className="pc-n mono">{pad2(p.index + 1)}</span>
                    <div>
                      <h3>{p.title}</h3>
                      <p className="mono">{c.label}{p.loc ? ` · ${p.loc}` : ""}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="plist" id="plist" hidden={view !== "list"}>
            {visible.map((p) => {
              const c = clientByKey[p.client];
              return (
                <a
                  className="pl"
                  key={p.id}
                  href={`/proyectos/${p.id}`}
                  data-img={p.photos[0] || ""}
                  onClick={goClick({ to: `/proyectos/${p.id}`, label: p.title })}
                >
                  <span className="pl-n mono">{pad2(p.index + 1)}</span>
                  <h3>{p.title}</h3>
                  <span className="pl-c mono">{c.label}</span>
                  <span className="pl-l mono">{p.loc || "—"}</span>
                  <span className="pl-t mono">{p.tags.slice(0, 2).join(" · ")}</span>
                  <span className="pl-ar"><ArrowDiag /></span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <ProjectsCta />
      <div className="pc-cur" id="pcCur"><span className="mono">Ver</span></div>
      <div className="pl-prev" id="plPrev"><img alt="" /></div>
    </main>
  );
}

export default memo(Projects);
