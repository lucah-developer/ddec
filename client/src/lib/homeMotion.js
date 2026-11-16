import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copyReveal, navTheme, reveals, siteApi } from "./motion";

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const MOBILE = () => window.innerWidth <= 768;

let heroStarted = false;

export function playHero() {
  if (heroStarted || siteApi.static) return;
  heroStarted = true;
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .fromTo("#heroH1 .ln-in", { y: 0, yPercent: 115 }, { y: 0, yPercent: 0, duration: 1.2, stagger: 0.12 })
    .fromTo("#hero [data-heroin]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, "-=0.8");
}

export function resetHeroFlag() {
  heroStarted = false;
}

function parallax() {
  gsap.to("#heroBg", {
    yPercent: 12,
    ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.fromTo(
    "#aboutImg",
    { yPercent: 0 },
    {
      yPercent: -14,
      ease: "none",
      scrollTrigger: { trigger: ".about-media", start: "top bottom", end: "bottom top", scrub: true },
    }
  );
  gsap.to(".cta-mark", {
    yPercent: -8,
    ease: "none",
    scrollTrigger: { trigger: ".cta-sec", start: "top bottom", end: "bottom top", scrub: true },
  });
}

function projects() {
  const arch = $("#arch");
  if (!arch) return;
  const lefts = $$(".arch__left .arch__info");
  const rights = $$(".arch__right .img-wrapper");
  const imgs = rights.map((r) => $("img", r));
  lefts.forEach((el) => {
    el.style.order = "";
  });
  rights.forEach((el) => {
    el.style.order = "";
    el.style.zIndex = "";
  });
  arch.classList.remove("is-stack");
  const stack = siteApi.static || MOBILE();
  rights.forEach((el, i) => {
    el.style.zIndex = rights.length - i;
  });
  if (stack) {
    arch.classList.add("is-stack");
    lefts.forEach((el, i) => {
      el.style.order = i * 2;
    });
    rights.forEach((el, i) => {
      el.style.order = i * 2 + 1;
      el.style.zIndex = "";
    });
    if (!siteApi.static) {
      rights.forEach((el) =>
        gsap.from(el, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        })
      );
    }
    return;
  }
  arch.classList.remove("is-stack");
  const num = $("#pjNum");
  const tints = ["#f1eee7", "#ebe7dc", "#e7e3d8", "#ece8df", "#e9e5da", "#f1eee7"];
  const main = gsap.timeline({
    scrollTrigger: {
      trigger: arch,
      start: "top top",
      end: "bottom bottom",
      pin: ".arch__right",
      scrub: true,
      onUpdate: (self) => {
        if (num) {
          num.textContent = String(Math.min(rights.length, Math.round(self.progress * (rights.length - 1)) + 1)).padStart(2, "0");
        }
      },
    },
  });
  gsap.set(rights, { clipPath: "inset(0)" });
  imgs.forEach((img, i) => {
    const next = imgs[i + 1];
    if (!next) return;
    const sec = gsap.timeline();
    sec
      .to(".projects", { backgroundColor: tints[i + 1], duration: 1.5, ease: "power2.inOut" }, 0)
      .to(rights[i], { clipPath: "inset(0px 0px 100%)", duration: 1.5, ease: "none" }, 0)
      .to(img, { yPercent: 7, duration: 1.5, ease: "none" }, 0)
      .fromTo(next, { yPercent: -7 }, { yPercent: 0, duration: 1.5, ease: "none" }, 0);
    main.add(sec);
  });
}

function stickyGrid() {
  const block = $(".block--main");
  if (!block || siteApi.static) return;
  const wrapper = $(".block__wrapper", block);
  const content = $(".content", block);
  const title = $(".content__title", block);
  const desc = $(".content__description", block);
  const button = $(".content__button", block);
  const gridEl = $(".gallery__grid", block);
  const items = $$(".gallery__item", block);
  const imgs = $$(".gallery__image", block);
  if (!wrapper || !content || !title || !gridEl) return;
  gsap.set([desc, button], { opacity: 0, pointerEvents: "none" });
  const dy0 = (content.offsetHeight - title.offsetHeight) / 2;
  const titleOffsetY = (dy0 / content.offsetHeight) * 100;
  gsap.set(title, { yPercent: titleOffsetY });
  const cols = Array.from({ length: 3 }, () => []);
  items.forEach((it, i) => cols[i % 3].push(it));
  gsap.from(wrapper, {
    yPercent: -100,
    ease: "none",
    scrollTrigger: { trigger: block, start: "top bottom", end: "top top", scrub: true },
  });
  gsap.from(title, {
    opacity: 0,
    duration: 0.7,
    ease: "power1.out",
    scrollTrigger: { trigger: block, start: "top 57%", toggleActions: "play none none reset" },
  });
  const reveal = () => {
    const tl = gsap.timeline();
    const wh = window.innerHeight;
    const dy = wh - (wh - gridEl.offsetHeight) / 2;
    cols.forEach((col, i) => {
      const fromTop = i % 2 === 0;
      tl.from(
        col,
        { y: dy * (fromTop ? -1 : 1), stagger: { each: 0.06, from: fromTop ? "end" : "start" }, ease: "power1.inOut" },
        "grid-reveal"
      );
    });
    return tl;
  };
  const zoom = () => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
    tl.to(gridEl, { scale: 2.05 });
    tl.to(cols[0], { xPercent: -40 }, "<");
    tl.to(cols[2], { xPercent: 40 }, "<");
    tl.to(
      cols[1],
      { yPercent: (i) => (i < Math.floor(cols[1].length / 2) ? -1 : 1) * 40, duration: 0.5, ease: "power1.inOut" },
      "-=0.5"
    );
    tl.to(imgs, { filter: "grayscale(.4) brightness(.38) contrast(1.05)", duration: 1, ease: "none" }, 0.2);
    return tl;
  };
  const toggle = (vis) => {
    gsap.timeline({ defaults: { overwrite: true } })
      .to(title, { yPercent: vis ? 0 : titleOffsetY, duration: 0.7, ease: "power2.inOut" })
      .to(
        [desc, button],
        {
          opacity: vis ? 1 : 0,
          duration: 0.4,
          ease: `power1.${vis ? "inOut" : "out"}`,
          pointerEvents: vis ? "all" : "none",
        },
        vis ? "-=90%" : "<"
      );
  };
  const tl = gsap.timeline({
    scrollTrigger: { trigger: block, start: "top 25%", end: "bottom bottom", scrub: true },
  });
  tl.add(reveal()).add(zoom(), "-=0.6").add(() => toggle(tl.scrollTrigger.direction === 1), "-=0.32");
}

export function mountHome(root) {
  const revealCtx = gsap.context(() => {
    copyReveal(root);
    reveals(root);
  }, root);
  let scene;
  const build = () => {
    scene?.revert();
    scene = gsap.context(() => {
      if (!siteApi.static) parallax();
      projects();
      stickyGrid();
      navTheme();
    }, root);
  };
  build();
  let wide = window.innerWidth > 768;
  const onResize = () => {
    const w = window.innerWidth > 768;
    if (w !== wide) {
      wide = w;
      build();
    } else ScrollTrigger.refresh();
  };
  window.addEventListener("resize", onResize);
  return () => {
    heroStarted = false;
    window.removeEventListener("resize", onResize);
    scene?.revert();
    revealCtx.revert();
  };
}
