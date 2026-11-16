import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import markLight from "../brand/logo/mark-light.png";
import { removeBoot, siteApi } from "../lib/motion";
import { playHero } from "../lib/homeMotion";

const Intro = forwardRef(function Intro(_, ref) {
  const rootRef = useRef(null);

  useImperativeHandle(ref, () => ({
    start() {
      const el = rootRef.current;
      if (!el) return;
      const tl = gsap.timeline();
      let finished = false;
      const finishEarly = () => {
        if (finished || tl.__skipped) return;
        tl.__skipped = true;
        gsap.to(tl, { time: tl.duration(), duration: 0.5, ease: "power2.in" });
      };
      const n = { v: 0 };
      const N = el.querySelector("#iaN");
      gsap.set(".ia-svg .d", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".ia-mark", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".ia-scan", { left: "4%" });
      gsap.set(".ia-cx", { scaleX: 0 });
      gsap.set(".ia-cy", { scaleY: 0 });
      gsap.set(".ia-meta,.ia-count,.ia-skip", { opacity: 0, y: 10 });
      gsap.set(".ia-bar i", { scaleX: 0 });
      tl.to(".ia-cx", { scaleX: 1, duration: 0.7, ease: "power3.out" }, 0)
        .to(".ia-cy", { scaleY: 1, duration: 0.7, ease: "power3.out" }, 0.05)
        .to(".ia-svg .d", { strokeDashoffset: 0, duration: 1.1, stagger: 0.09, ease: "power2.inOut" }, 0.15)
        .to(".ia-meta,.ia-count,.ia-skip", { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.1)
        .to(".ia-mark", { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut" }, 0.3)
        .to(".ia-scan", { left: "96%", duration: 1.5, ease: "power2.inOut" }, 0.3)
        .to(".ia-scan", { opacity: 0, duration: 0.2 }, 1.8)
        .to(
          n,
          {
            v: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              if (N) N.textContent = String(Math.round(n.v)).padStart(3, "0");
            },
          },
          0
        )
        .to(".ia-bar i", { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0)
        .addLabel("out", 1.95)
        .add(() => removeBoot(), "out")
        .to(".ia-stage,.ia-meta,.ia-count,.ia-bar,.ia-skip,.ia-cx,.ia-cy", { opacity: 0, duration: 0.3, ease: "power2.in" }, "out")
        .to(".ia-top", { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "out+=0.15")
        .to(".ia-bot", { yPercent: 100, duration: 0.85, ease: "power4.inOut" }, "out+=0.15")
        .add(() => {
          finished = true;
          playHero();
        }, "out+=0.5");
      const onKey = (e) => {
        if (["Escape", "Enter", " "].includes(e.key)) finishEarly();
      };
      el.addEventListener("click", finishEarly);
      window.addEventListener("keydown", onKey);
      tl.eventCallback("onComplete", () => {
        window.removeEventListener("keydown", onKey);
        el.style.display = "none";
        document.documentElement.classList.remove("intro-lock");
        removeBoot();
        siteApi.startLenis();
        ScrollTrigger.refresh();
      });
    },
  }));

  return (
    <div className="intro" id="intro" ref={rootRef} aria-hidden="true">
      <div className="ia-half ia-top" />
      <div className="ia-half ia-bot" />
      <div className="ia-layer">
        <i className="ia-cx" />
        <i className="ia-cy" />
        <div className="ia-stage">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="ia-svg" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
              <path className="d" pathLength="1" d="M-6 -6 H8 M-6 -6 V8" />
              <path className="d" pathLength="1" d="M106 -6 H92 M106 -6 V8" />
              <path className="d" pathLength="1" d="M-6 106 H8 M-6 106 V92" />
              <path className="d" pathLength="1" d="M106 106 H92 M106 106 V92" />
              <path className="d" pathLength="1" d="M0 114 H100 M0 110 V118 M100 110 V118 M4 112 L0 114 L4 116 M96 112 L100 114 L96 116" />
              <path className="d" pathLength="1" d="M-14 0 V100 M-18 0 H-10 M-18 100 H-10 M-16 4 L-14 0 L-12 4 M-16 96 L-14 100 L-12 96" />
              <path className="d r" pathLength="1" d="M50 -12 V112" />
            </g>
          </svg>
          <div className="ia-mark">
            <img src={markLight} alt="" />
          </div>
          <span className="ia-scan" />
        </div>
        <div className="ia-meta ia-tl mono">
          <b>D.D.E.C. S.R.L.</b>
          <br />
          Diseño · Desarrollo · Estructuras civiles
        </div>
        <div className="ia-meta ia-tr mono">
          San Rafael, Mendoza
          <br />
          34.6177° S · 68.3301° O
        </div>
        <div className="ia-count">
          <b id="iaN">000</b>
          <span>%</span>
        </div>
        <div className="ia-bar">
          <i />
        </div>
        <button className="ia-skip mono" type="button">
          Saltar ›
        </button>
      </div>
    </div>
  );
});

export default Intro;
