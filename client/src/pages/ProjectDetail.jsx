import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import markLight from "../brand/logo/mark-light.png";
import { ArrowDiag, ArrowRight } from "../components/Icons";
import { PROJECTS, clientByKey, pad2, projectById } from "../data/projects";
import { mountDetail, playDetail, prepareDetail } from "../lib/detailMotion";
import { goClick, setNavLight, siteApi } from "../lib/motion";
import { setSeo } from "../lib/seo";
import { usePageLifecycle } from "../lib/usePageLifecycle";

function moreOf(project) {
  const idx = PROJECTS.findIndex((q) => q.id === project.id);
  const c = clientByKey[project.client];
  const others = PROJECTS.filter((q) => q.client === project.client && q.id !== project.id);
  const more = others.slice(0, 3);
  let title = `Más de ${c.label}`;
  if (more.length < 3) {
    title = more.length ? `Más de ${c.label} y otras obras` : "Otras obras";
    for (let k = 1; more.length < 3 && k < PROJECTS.length; k += 1) {
      const q = PROJECTS[(idx + 1 + k) % PROJECTS.length];
      if (q.id !== project.id && !more.includes(q)) more.push(q);
    }
  }
  return { title, more };
}

function Card({ project }) {
  const c = clientByKey[project.client];
  const has = project.photos.length > 0;
  return (
    <a className="pc pm-c" href={`/proyectos/${project.id}`} onClick={goClick({ to: `/proyectos/${project.id}`, label: project.title })}>
      <div className={has ? "pc-img" : "pc-img noimg"}>
        {has ? (
          <img src={project.photos[0]} alt={project.title} loading="lazy" />
        ) : (
          <>
            <img className="nomark" src={markLight} alt="" />
            <span className="mono">Registro fotográfico en preparación</span>
          </>
        )}
        <span className="pc-ar"><ArrowDiag /></span>
      </div>
      <div className="pc-info">
        <span className="pc-n mono">{pad2(project.index + 1)}</span>
        <div>
          <h3>{project.title}</h3>
          <p className="mono">{c.label}{project.loc ? ` · ${project.loc}` : ""}</p>
        </div>
      </div>
    </a>
  );
}

function Gallery({ project, onOpen }) {
  const photos = project.photos;
  const n = photos.length;
  if (!n) return null;
  if (n === 1) {
    return (
      <section className="pgal pgal-1" data-nav="light" id="galeria">
        <div className="wrap">
          <div className="pgal-h"><p className="eyebrow">Registro fotográfico</p><span className="mono">01 / 01</span></div>
          <figure className="gf" data-i="0" onClick={() => onOpen(0)}><img src={photos[0]} alt={project.title} /></figure>
        </div>
      </section>
    );
  }
  if (n === 2) {
    return (
      <section className="pgal pgal-2" data-nav="light" id="galeria">
        <div className="wrap">
          <div className="pgal-h"><p className="eyebrow">Registro fotográfico</p><span className="mono">{pad2(n)} fotografías</span></div>
          <div className="pgal-2g">
            {photos.map((src, i) => (
              <figure className="gf" data-r key={src} data-i={i} onClick={() => onOpen(i)}>
                <img src={src} alt={`${project.title} — foto ${i + 1}`} />
                <figcaption className="mono">{pad2(i + 1)} / {pad2(n)}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="pgal pgal-hs" data-nav="light" id="galeria">
      <div className="pgal-pin">
        <div className="wrap pgal-h">
          <p className="eyebrow">Registro fotográfico</p>
          <span className="mono" id="gCount">01 / {pad2(n)}</span>
        </div>
        <div className="pgal-track" id="gTrack">
          {photos.map((src, i) => (
            <figure className="gf" key={src + i} data-i={i} onClick={() => onOpen(i)}>
              <img src={src} alt={`${project.title} — foto ${i + 1}`} />
              <figcaption className="mono">{pad2(i + 1)} / {pad2(n)}</figcaption>
            </figure>
          ))}
        </div>
        <div className="wrap">
          <div className="pgal-bar"><i id="gBar" /></div>
          <p className="mono pgal-hint">Desplazá para recorrer · Clic para ampliar</p>
        </div>
      </div>
    </section>
  );
}

function Lightbox({ photos, title, index, setIndex }) {
  useEffect(() => {
    if (index == null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowLeft") setIndex((index - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setIndex((index + 1) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    siteApi.lock(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      siteApi.lock(false);
    };
  }, [index, photos.length, setIndex]);

  if (index == null) return null;
  const src = photos[index];
  return (
    <div className="lb" id="lb" onClick={(e) => { if (e.target === e.currentTarget) setIndex(null); }}>
      <button className="lb-x mono" type="button" aria-label="Cerrar" onClick={() => setIndex(null)}>Cerrar ✕</button>
      {photos.length > 1 && (
        <>
          <button className="lb-p" type="button" aria-label="Anterior" onClick={() => setIndex((index - 1 + photos.length) % photos.length)}>←</button>
          <button className="lb-n" type="button" aria-label="Siguiente" onClick={() => setIndex((index + 1) % photos.length)}>→</button>
        </>
      )}
      <figure>
        <img src={src} alt={title} />
        <figcaption className="mono">{pad2(index + 1)} / {pad2(photos.length)} — {title}</figcaption>
      </figure>
    </div>
  );
}

const DetailView = memo(function DetailView({ project, onOpen }) {
  const c = clientByKey[project.client];
  const idx = project.index;
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const photos = project.photos;
  const n = photos.length;
  const { title: moreTitle, more } = moreOf(project);
  const lead = project.sub || `${project.title}: obra ejecutada por D.D.E.C. para ${c.full}${project.loc ? `, en ${project.loc}` : ""}.`;
  const facts = [
    ["Cliente", c.full],
    ["Sector", c.sector],
    ...(project.loc ? [["Ubicación", project.loc]] : []),
    ["Tipo de obra", project.tags.length ? project.tags : "—", true],
    ["Registro", n ? `${n} ${n === 1 ? "fotografía" : "fotografías"}` : "Registro fotográfico en preparación"],
    ["Referencia", `Proyecto ${pad2(idx + 1)} de ${pad2(PROJECTS.length)}`],
  ];

  usePageLifecycle(
    project.id,
    async () => {
      setSeo({
        title: `${project.title} — D.D.E.C. S.R.L.`,
        description: lead.length > 160 ? `${lead.slice(0, 157)}…` : lead,
        path: `/proyectos/${project.id}`,
      });
      const img = document.querySelector("#phBg img");
      if (img && !img.complete) {
        await new Promise((res) => {
          img.addEventListener("load", res, { once: true });
          img.addEventListener("error", res, { once: true });
        });
      }
      const split = !!(img && img.naturalWidth && img.naturalHeight > img.naturalWidth * 1.05 && window.innerWidth > 900);
      const ph = document.getElementById("ph");
      ph?.classList.toggle("is-split", split);
      if (split && n === 1) document.getElementById("galeria")?.remove();
      siteApi.entrance = playDetail;
      const root = document.getElementById("top") || document.body;
      return mountDetail(root, n);
    },
    () => {
      setNavLight(false);
      if (!siteApi.static) prepareDetail();
    }
  );

  return (
    <main id="top">
      <section className="ph dark" id="ph" data-nav="dark">
        <div className="ph-bg" id="phBg">
          {n ? (
            <img src={photos[0]} alt={project.title} />
          ) : (
            <div className="noimg ph-noimg"><img className="nomark" src={markLight} alt="" /></div>
          )}
        </div>
        <div className="ph-shade" />
        <div className="wrap ph-in">
          <div className="ph-top mono" data-heroin>
            <a href={`/proyectos?c=${project.client}`} onClick={goClick({ to: `/proyectos?c=${project.client}`, label: "Proyectos" })}>
              <span className="ph-back">←</span> Proyectos
            </a>
            <span>/</span>
            <span>{c.label}</span>
          </div>
          <div className="ph-bot">
            <div className="ph-idx mono" data-heroin>Proyecto {pad2(idx + 1)} / {pad2(PROJECTS.length)}</div>
            <h1 className="ph-title" id="phTitle" aria-label={project.title}>
              {project.title.split(" ").map((w, i, arr) => (
                <span key={`${w}-${i}`}>
                  <span className="w"><span className="wi">{w}</span></span>
                  {i < arr.length - 1 ? " " : null}
                </span>
              ))}
            </h1>
            <div className="ph-foot" data-heroin>
              <div className="ph-chips">
                {project.tags.map((t) => <i className="mono" key={t}>{t}</i>)}
              </div>
              <div className="ph-loc mono">{project.loc || c.sector}</div>
              <div className="ph-scr mono">Scroll <span /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="pd" data-nav="light" id="ficha">
        <div className="wrap pd-grid">
          <aside className="pd-side" data-r>
            <h4 className="mono">Ficha del proyecto</h4>
            <dl>
              {facts.map(([k, v, tags]) => (
                <div key={k}>
                  <dt className="mono">{k}</dt>
                  <dd className={tags ? "tg" : undefined}>
                    {tags && Array.isArray(v) ? v.map((t) => <i key={t}>{t}</i>) : v}
                  </dd>
                </div>
              ))}
            </dl>
            <a href="/#contacto" className="btn btn-ink" onClick={goClick({ to: "/", hash: "contacto", label: "Contacto" })}>
              <span>Consultar una obra similar</span>
              <i className="arr"><ArrowDiag /></i>
            </a>
          </aside>
          <div className="pd-main">
            <p className="eyebrow" data-r>{project.head || "Sobre el proyecto"}</p>
            <h2 className="pd-lead" data-copy data-block="#c1121f">{lead}</h2>
            {project.desc && project.desc.length ? (
              <div className="pd-body">
                {project.desc.map((t) => <p data-r key={t.slice(0, 24)}>{t}</p>)}
              </div>
            ) : (
              <p className="pd-note mono" data-r>Memoria descriptiva en preparación</p>
            )}
          </div>
        </div>
      </section>

      <Gallery project={project} onOpen={onOpen} />

      <section className="pm" data-nav="light">
        <div className="wrap">
          <div className="pm-h">
            <h3 className="h-md">{moreTitle}</h3>
            <a href={`/proyectos?c=${project.client}`} className="mono pm-all" onClick={goClick({ to: `/proyectos?c=${project.client}`, label: "Proyectos" })}>
              Ver todos los proyectos <ArrowDiag />
            </a>
          </div>
          <div className="pm-g">
            {more.map((q) => <Card key={q.id} project={q} />)}
          </div>
        </div>
      </section>

      <section className="pn dark" id="pn" data-nav="dark">
        <div className="pn-bg">
          {next.photos.length ? <img src={next.photos[0]} alt="" /> : <div className="noimg ph-noimg" />}
        </div>
        <div className="pn-shade" />
        <div className="wrap pn-in">
          <div className="pn-top">
            <a className="pn-prev mono" href={`/proyectos/${prev.id}`} onClick={goClick({ to: `/proyectos/${prev.id}`, label: prev.title })}>
              <span>←</span> Anterior <b>{prev.title}</b>
            </a>
            <span className="mono pn-i">{pad2(idx + 1)} / {pad2(PROJECTS.length)}</span>
          </div>
          <a className="pn-next" href={`/proyectos/${next.id}`} onClick={goClick({ to: `/proyectos/${next.id}`, label: next.title })}>
            <span className="mono">Siguiente proyecto · {pad2(next.index + 1)}</span>
            <b className="pn-title">{next.title}</b>
            <span className="pn-go"><ArrowRight size={22} /></span>
          </a>
        </div>
      </section>
    </main>
  );
});

function ProjectDetail() {
  const { id } = useParams();
  const project = projectById(id) || PROJECTS[0];
  const [lb, setLb] = useState(null);
  useEffect(() => {
    setLb(null);
  }, [project.id]);
  return (
    <>
      <DetailView project={project} onOpen={setLb} />
      <Lightbox photos={project.photos} title={project.title} index={lb} setIndex={setLb} />
    </>
  );
}

export default ProjectDetail;
