import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const siteApi = {
  static:
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("is-static"),
  lenis: null,
  inited: false,
  busy: false,
  expectPage: false,
  deferEntrance: false,
  entrance: null,
  navigate: null,
  location: null,

  init() {
    if (this.inited || typeof window === "undefined") return;
    this.inited = true;
    this.static = document.documentElement.classList.contains("is-static");
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    if (!this.static) {
      this.lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.1, autoRaf: false });
      this.lenis.on("scroll", ScrollTrigger.update);
      const lenis = this.lenis;
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    const onS = () => {
      const y = this.lenis ? this.lenis.scroll : window.scrollY;
      document.getElementById("nav")?.classList.toggle("scrolled", y > 40);
    };
    window.addEventListener("scroll", onS, { passive: true });
    this.lenis?.on("scroll", onS);
    onS();
    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => ScrollTrigger.refresh(), 250);
    });
    window.addEventListener("load", () => ScrollTrigger.refresh());
  },

  startLenis() {
    this.lenis?.start();
  },
  stopLenis() {
    this.lenis?.stop();
  },

  scrollTo(y, immediate = true) {
    if (this.lenis) this.lenis.scrollTo(y, { immediate, force: true });
    else window.scrollTo(0, y);
    ScrollTrigger.update();
  },

  scrollToHash(hash) {
    if (!hash || hash === "top") {
      this.scrollTo(0, true);
      return;
    }
    const el = document.getElementById(hash);
    if (!el) {
      this.scrollTo(0, true);
      return;
    }
    this.scrollTo(el.getBoundingClientRect().top + window.scrollY, true);
  },

  lock(on) {
    if (this.lenis) on ? this.lenis.stop() : this.lenis.start();
    document.documentElement.classList.toggle("modal-lock", on);
  },

  curtainOut(label) {
    const curtain = document.getElementById("curtain");
    const lbl = document.getElementById("curtainLbl");
    if (!curtain) return Promise.resolve();
    if (lbl) lbl.textContent = label || "D.D.E.C.";
    return new Promise((res) => {
      gsap.timeline({ onComplete: res })
        .set(curtain, { visibility: "visible", clipPath: "inset(100% 0 0 0)" })
        .to(curtain, { clipPath: "inset(0% 0 0 0)", duration: 0.65, ease: "power4.inOut" })
        .fromTo(".curtain .lbl", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.25")
        .to({}, { duration: 0.12 });
    });
  },

  curtainAway(delay = 0.2) {
    const curtain = document.getElementById("curtain");
    if (!curtain) return Promise.resolve();
    return new Promise((res) => {
      gsap.timeline({ onComplete: res })
        .set(curtain, { visibility: "visible", clipPath: "inset(0% 0 0 0)" })
        .to(curtain, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "power4.inOut", delay })
        .set(curtain, { visibility: "hidden" });
    });
  },

  go({ to = "/", hash = "", label = "D.D.E.C." }) {
    if (this.busy) return;
    const path = (this.location?.pathname || "/").replace(/\/+$/, "") || "/";
    const dest = (to || "/").replace(/\/+$/, "") || "/";
    const same = path === dest;
    document.body.classList.remove("menu-open");
    this.startLenis();
    const href = hash ? `${dest === "/" ? "/" : dest}#${hash}` : dest === "/" ? "/" : dest;
    if (this.static) {
      if (same) this.scrollToHash(hash);
      else this.navigate?.(href);
      return;
    }
    this.busy = true;
    this.curtainOut(label).then(() => {
      if (same) {
        this.scrollToHash(hash);
        ScrollTrigger.refresh();
        this.curtainAway(0.35);
        gsap.delayedCall(1.2, () => {
          this.busy = false;
        });
        return;
      }
      try {
        sessionStorage.setItem("ddec-from", "1");
      } catch (e) {
        /* ignore */
      }
      this.expectPage = true;
      this.scrollTo(0, true);
      this.navigate?.(href);
      gsap.delayedCall(5, () => {
        if (this.busy && this.expectPage) {
          this.expectPage = false;
          this.busy = false;
          this.curtainAway(0);
        }
      });
    });
  },

  pageReady() {
    const play = this.deferEntrance ? null : this.entrance;
    this.entrance = null;
    this.deferEntrance = false;
    if (this.expectPage) {
      this.expectPage = false;
      this.curtainAway(0.25);
      gsap.delayedCall(0.55, () => {
        if (play) play();
        this.busy = false;
      });
      return;
    }
    if (play) play();
    this.busy = false;
  },
};

export function goClick(opts) {
  return (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    siteApi.go(opts);
  };
}

export function removeBoot() {
  document.getElementById("boot-cover")?.remove();
}

function splitLines(el) {
  const tokens = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const raw = node.textContent || "";
    if (!raw.trim()) return;
    const serif = !!(node.parentElement && node.parentElement.classList.contains("serif"));
    const frag = document.createDocumentFragment();
    raw.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(" "));
        return;
      }
      const s = document.createElement("span");
      s.textContent = part;
      frag.appendChild(s);
      tokens.push({ el: s, serif, text: part });
    });
    node.parentNode.replaceChild(frag, node);
  });
  if (!tokens.length) return [];
  const groups = [];
  tokens.forEach((t) => {
    const top = t.el.offsetTop;
    const last = groups[groups.length - 1];
    if (!last || Math.abs(last.top - top) > 3) groups.push({ top, items: [t] });
    else last.items.push(t);
  });
  el.replaceChildren();
  return groups.map((g) => {
    const wrap = document.createElement("div");
    wrap.className = "block-line-wrapper";
    const line = document.createElement("div");
    line.className = "block-line";
    g.items.forEach((t, i) => {
      if (i) line.appendChild(document.createTextNode(" "));
      const w = document.createElement("span");
      if (t.serif) w.className = "serif";
      w.textContent = t.text;
      line.appendChild(w);
    });
    const block = document.createElement("div");
    block.className = "block-revealer";
    block.style.backgroundColor = el.dataset.block || "#c1121f";
    wrap.appendChild(line);
    wrap.appendChild(block);
    el.appendChild(wrap);
    return { line, block };
  });
}

export function copyReveal(root = document) {
  if (siteApi.static) return;
  root.querySelectorAll("[data-copy]").forEach((el) => {
    if (el.dataset.split === "1") return;
    el.dataset.split = "1";
    const lines = splitLines(el);
    lines.forEach(({ line, block }) => {
      gsap.set(line, { opacity: 0 });
      gsap.set(block, { scaleX: 0, transformOrigin: "left center" });
    });
    lines.forEach(({ line, block }, i) => {
      const t = gsap.timeline({ delay: i * 0.13, paused: true });
      t.to(block, { scaleX: 1, duration: 0.7, ease: "power4.inOut" })
        .set(line, { opacity: 1 })
        .set(block, { transformOrigin: "right center" })
        .to(block, { scaleX: 0, duration: 0.7, ease: "power4.inOut" });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => t.play(),
      });
    });
  });
}

export function reveals(root = document) {
  const items = Array.from(root.querySelectorAll("[data-r]")).filter((e) => !e.dataset.revealed);
  if (siteApi.static) {
    items.forEach((e) => {
      e.style.opacity = "1";
      e.style.transform = "none";
    });
    return;
  }
  items.forEach((e) => {
    e.dataset.revealed = "1";
  });
  if (items.length) {
    ScrollTrigger.batch(items, {
      start: "top 92%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          overwrite: true,
        }),
    });
  }
  root.querySelectorAll("[data-count]").forEach((el) => {
    if (el.dataset.counted) return;
    el.dataset.counted = "1";
    const end = +el.dataset.count;
    const pad = +el.dataset.pad || 0;
    const suf = el.dataset.suffix || "";
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to(o, {
          v: end,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(o.v)).padStart(pad, "0") + suf;
          },
        }),
    });
  });
}

export function navTheme() {
  document.querySelectorAll("[data-nav]").forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: "top 50px",
      end: "bottom 50px",
      onToggle: (self) => {
        if (!self.isActive) return;
        document.getElementById("nav")?.classList.toggle("on-light", sec.dataset.nav === "light");
      },
    });
  });
}

export function setNavLight(on) {
  document.getElementById("nav")?.classList.toggle("on-light", on);
}
