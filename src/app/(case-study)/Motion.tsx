"use client";

import { useEffect } from "react";

/**
 * Behaviour layer, ported from the template's script.js.
 *
 * Reveal-on-scroll and a rail that tracks which stage is in view. The rail
 * is progressive enhancement: every stage is a real anchor, so the page is
 * fully navigable before this runs and if it never runs at all.
 */
export default function Motion({
  revealClass,
  inClass,
  activeClass,
}: {
  revealClass: string;
  inClass: string;
  activeClass: string;
}) {
  useEffect(() => {
    const reveals = [...document.querySelectorAll(`.${revealClass}`)];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let revealIO: IntersectionObserver | null = null;

    if (reduce) {
      /* Nothing is communicated by the reveal, so removing it loses nothing. */
      reveals.forEach((el) => el.classList.add(inClass));
    } else {
      revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            window.setTimeout(() => el.classList.add(inClass), i * 60);
            revealIO?.unobserve(el);
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach((el) => revealIO?.observe(el));
    }

    /* Rail tracking: a thin band through the middle of the viewport decides
       which stage is current, the same mechanic the template uses. */
    const stages = [...document.querySelectorAll("[data-stage]")];
    const thumbs = [...document.querySelectorAll("[data-stage-link]")];
    const railIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = (entry.target as HTMLElement).dataset.stage;
          thumbs.forEach((t) => {
            const match = (t as HTMLElement).dataset.stageLink === id;
            t.classList.toggle(activeClass, match);
            if (match) t.setAttribute("aria-current", "true");
            else t.removeAttribute("aria-current");
          });
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );
    stages.forEach((s) => railIO.observe(s));

    return () => {
      revealIO?.disconnect();
      railIO.disconnect();
    };
  }, [revealClass, inClass, activeClass]);

  return null;
}
