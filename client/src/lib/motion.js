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
    const nav = document.getElementById("nav");
    const offset = (nav ? nav.offsetHeight : 72) + 16;
    const current = this.lenis ? this.lenis.scroll : window.scrollY;
    const y = el.getBoundingClientRect().top + current - offset;
    this.scrollTo(Math.max(0, y), true);
  },

  lock(on) {
    if (this.lenis) on ? this.lenis.stop() : this.lenis.start();
    document.documentElement.classList.toggle("modal-lock", on);
  },

  mountSlices(count, orientation) {
    const row = document.getElementById("sliceRow");
    if (!row) return [];
    row.classList.toggle("is-vertical", orientation === "vertical");
    row.classList.toggle("is-horizontal", orientation === "horizontal");
    row.replaceChildren();
    const slices = [];
    for (let i = 0; i < count; i += 1) {
      const slice = document.createElement("i");
      row.appendChild(slice);
      slices.push(slice);
    }
    return slices;
  },

  curtainOut(label = "") {
    const curtain = document.getElementById("curtain");
    if (!curtain) return Promise.resolve();
    this._cu?.kill();
    const slices = this.mountSlices(4, "vertical");
    const word = document.getElementById("curtainLabel");
    if (word) {
      word.textContent = label || "";
      gsap.set(word, { autoAlpha: label ? 1 : 0, yPercent: 100, xPercent: 0 });
    }
    curtain.classList.add("is-on");
    return new Promise((res) => {
      this._cu = gsap.timeline({ onComplete: res });
      this._cu.fromTo(
        slices,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.8, ease: "power3.inOut", stagger: 0.08 }
      );
      if (word && label) {
        this._cu.to(word, { yPercent: 0, duration: 0.8, ease: "power3.inOut" }, 0.08);
      }
    });
  },

  curtainAway(delay = 0.06) {
    const curtain = document.getElementById("curtain");
    if (!curtain) return Promise.resolve();
    this._cu?.kill();
    const slices = this.mountSlices(7, "horizontal");
    const word = document.getElementById("curtainLabel");
    curtain.classList.add("is-on");
    gsap.set(slices, { xPercent: 0, yPercent: 0 });
    if (word) gsap.set(word, { xPercent: 0, yPercent: 0, autoAlpha: word.textContent ? 1 : 0 });
    return new Promise((res) => {
      this._cu = gsap.timeline({
        onComplete: () => {
          curtain.classList.remove("is-on");
          if (word) word.textContent = "";
          res();
        },
      });
      this._cu.to(slices, { xPercent: 100, duration: 0.8, ease: "power3.inOut", stagger: 0.08, delay });
      if (word && word.textContent) {
        this._cu.to(word, { xPercent: 100, duration: 0.8, ease: "power3.inOut", delay }, 0);
      }
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
        this.curtainAway(0.06).then(() => {
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
      this.curtainAway(0.06).then(() => {
        this.busy = false;
      });
      gsap.delayedCall(0.28, () => {
        if (play) play();
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
