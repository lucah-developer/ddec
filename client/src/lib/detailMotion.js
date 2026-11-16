import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copyReveal, navTheme, reveals, siteApi } from "./motion";

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

let played = false;

export function prepareDetail() {
  if (siteApi.static) return;
  gsap.set(".ph-title .wi", { y: 0, yPercent: 118 });
  gsap.set("#ph [data-heroin]", { opacity: 0, y: 14 });
  gsap.set("#phBg", { clipPath: "inset(0 0 100% 0)" });
  gsap.set("#phBg img, #phBg .ph-noimg", { scale: 1.2 });
}

export function playDetail() {
  if (played || siteApi.static) return;
  played = true;
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .to("#phBg", { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power4.inOut" })
    .to("#phBg img, #phBg .ph-noimg", { scale: 1, duration: 1.8 }, 0)
    .to(".ph-title .wi", { y: 0, yPercent: 0, duration: 1.15, stagger: 0.09 }, 0.55)
    .to("#ph [data-heroin]", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 1);
}

function horizontal(n) {
  const sec = $("#galeria");
  const pin = $(".pgal-pin", sec || document);
  const track = $("#gTrack");
  const bar = $("#gBar");
  const count = $("#gCount");
  if (!sec || !pin || !track || siteApi.static || window.innerWidth <= 900) return;
  const dist = () =>
    Math.max(0, track.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(track).paddingLeft) * 2);
  const pad2 = (v) => String(v).padStart(2, "0");
  gsap.to(track, {
    x: () => -dist(),
    ease: "none",
    scrollTrigger: {
      trigger: sec,
      start: "top top",
      end: () => "+=" + dist(),
      pin,
      scrub: true,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: (s) => {
        if (bar) gsap.set(bar, { scaleX: s.progress });
        if (count) {
          count.textContent = `${pad2(Math.min(n, Math.round(s.progress * (n - 1)) + 1))} / ${pad2(n)}`;
        }
      },
    },
  });
  $$("img", track).forEach((img) => {
    if (!img.complete) img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  });
}

export function mountDetail(root, photoCount) {
  played = false;
  const ctx = gsap.context(() => {
    copyReveal(root);
    reveals(root);
    navTheme();
    if (siteApi.static) return;
    gsap.to("#phBg img, #phBg .ph-noimg", {
      yPercent: 14,
      ease: "none",
      scrollTrigger: { trigger: "#ph", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.fromTo(
      ".ph-title",
      { y: 0 },
      {
        y: -60,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: "#ph", start: "60% top", end: "bottom top", scrub: true },
      }
    );
    if (photoCount >= 3) horizontal(photoCount);
    else if (photoCount === 2) {
      gsap.utils.toArray(".pgal-2g .gf img").forEach((im) =>
        gsap.fromTo(im, { scale: 1.12 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: im.parentNode, start: "top bottom", end: "bottom top", scrub: true },
        })
      );
    } else if (photoCount === 1 && $(".pgal-1")) {
      gsap.from(".pgal-1 .gf", {
        clipPath: "inset(12% 8% 12% 8%)",
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { trigger: ".pgal-1 .gf", start: "top 85%", once: true },
      });
    }
    gsap.fromTo(
      ".pn-bg img, .pn-bg .ph-noimg",
      { scale: 1.15, yPercent: -6 },
      {
        scale: 1,
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: "#pn", start: "top bottom", end: "center center", scrub: true },
      }
    );
  }, root);
  const nx = $(".pn-next");
  const onIn = () => $("#pn")?.classList.add("hov");
  const onOut = () => $("#pn")?.classList.remove("hov");
  nx?.addEventListener("mouseenter", onIn);
  nx?.addEventListener("mouseleave", onOut);
  let wide = window.innerWidth > 900;
  const onResize = () => {
    const w = window.innerWidth > 900;
    if (w !== wide) {
      wide = w;
      ScrollTrigger.refresh();
    }
  };
  window.addEventListener("resize", onResize);
  return () => {
    played = false;
    nx?.removeEventListener("mouseenter", onIn);
    nx?.removeEventListener("mouseleave", onOut);
    window.removeEventListener("resize", onResize);
    ctx.revert();
  };
}
