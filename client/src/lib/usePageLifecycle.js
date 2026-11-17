import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteApi } from "./motion";

function waitForImages() {
  const imgs = Array.from(document.querySelectorAll("main img"))
    .filter((img) => img.getAttribute("src"))
    .slice(0, 8);
  if (!imgs.length) return Promise.resolve();
  const loaded = Promise.all(
    imgs.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.addEventListener("load", res, { once: true });
              img.addEventListener("error", res, { once: true });
            })
    )
  );
  return Promise.race([loaded, new Promise((res) => setTimeout(res, 1600))]);
}

/** Prepara el DOM, espera las fuentes y abre la cortina si veníamos de otra ruta.
 *  `key` cambia de página; setup/prepare pueden ser funciones nuevas en cada render. */
export function usePageLifecycle(key, setup, prepare) {
  const setupRef = useRef(setup);
  const prepareRef = useRef(prepare);
  setupRef.current = setup;
  prepareRef.current = prepare;
  useLayoutEffect(() => {
    prepareRef.current?.();
    let dead = false;
    let cleanup = () => {};
    (async () => {
      try {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
      } catch (e) {
        /* ignore */
      }
      if (dead) return;
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) siteApi.scrollToHash(hash);
      else if (siteApi.expectPage) siteApi.scrollTo(0, true);
      if (siteApi.expectPage) await waitForImages();
      let result = setupRef.current?.();
      if (result && typeof result.then === "function") result = await result;
      if (dead) {
        if (typeof result === "function") result();
        return;
      }
      cleanup = typeof result === "function" ? result : () => {};
      ScrollTrigger.refresh();
      if (!dead) siteApi.pageReady();
    })();
    return () => {
      dead = true;
      cleanup();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [key]);
}
