import { useLayoutEffect } from "react";
import gsap from "gsap";

const HOT = "a, button, summary, label, [role='button'], [role='tab']";
const TEXT = "input, textarea, select, option";

export default function Cursor() {
  useLayoutEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return undefined;

    const root = document.getElementById("cursor");
    const frame = root?.querySelector(".cursor__frame");
    const mark = root?.querySelector(".cursor__mark");
    if (!root || !frame || !mark) return undefined;

    const reduced = document.documentElement.classList.contains("is-static");
    document.documentElement.classList.add("has-cursor");
    gsap.set([frame, mark], { xPercent: -50, yPercent: -50 });

    const pos = { x: -80, y: -80, fx: -80, fy: -80, scale: 1, mark: 1 };
    let tx = -80;
    let ty = -80;
    let want = 1;
    let wantMark = 1;
    let hot = false;
    let pressed = false;

    const aim = () => {
      want = hot ? 1.75 : 1;
      wantMark = pressed ? 0.7 : 1;
    };

    const tick = () => {
      const follow = reduced ? 1 : 0.42;
      const lag = reduced ? 1 : 0.16;
      const grow = reduced ? 1 : 0.18;
      pos.x += (tx - pos.x) * follow;
      pos.y += (ty - pos.y) * follow;
      pos.fx += (tx - pos.fx) * lag;
      pos.fy += (ty - pos.fy) * lag;
      pos.scale += (want - pos.scale) * grow;
      pos.mark += (wantMark - pos.mark) * grow;
      gsap.set(mark, { x: pos.x, y: pos.y, scale: pos.mark });
      gsap.set(frame, { x: pos.fx, y: pos.fy, scale: pos.scale });
    };
    gsap.ticker.add(tick);

    const onMove = (e) => {
      const text = e.target.closest?.(TEXT);
      const next = !text && !!e.target.closest?.(HOT);
      root.classList.toggle("is-text", !!text);
      root.classList.remove("is-off");
      tx = e.clientX;
      ty = e.clientY;
      if (next !== hot) {
        hot = next;
        aim();
      }
    };
    const onDown = () => {
      pressed = true;
      aim();
    };
    const onUp = () => {
      pressed = false;
      aim();
    };
    const onLeave = () => root.classList.add("is-off");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="cursor is-off" id="cursor" aria-hidden="true">
      <div className="cursor__frame" />
      <i className="cursor__mark" />
    </div>
  );
}
