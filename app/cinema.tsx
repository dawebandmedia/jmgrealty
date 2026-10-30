"use client";

/*
 * JMG cinema layer: site-wide motion that runs on every page through <Shell>.
 * Dependency-free. Everything here is progressive enhancement:
 *  - nothing is hidden unless <html> carries .jmg-cinema, which this file adds
 *    only when motion is allowed (device setting + the footer "Reduce motion" toggle);
 *  - React-owned elements are only touched through data-* attributes, CSS variables
 *    and the individual `translate`/`scale` properties, never className or children,
 *    so re-renders can't undo or fight the effects.
 */

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------ preference */
export function cinemaAllowed() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  if (document.documentElement.dataset.jmgMotion === "reduced") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
const finePointer = () => typeof window.matchMedia === "function" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Re-evaluates when the device setting or the site's own motion toggle changes. */
export function useCinema() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const update = () => setOn(cinemaAllowed());
    update();
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    query.addEventListener?.("change", update);
    const watch = new MutationObserver(update);
    watch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-jmg-motion"] });
    return () => { query.removeEventListener?.("change", update); watch.disconnect(); };
  }, []);
  return on;
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ------------------------------------------------------- smooth scrolling */
// Desktop mouse wheels only. Keyboard, scrollbar, touch and trackpad-in-dialogs stay native.
function smoothWheel() {
  let target = window.scrollY, current = window.scrollY, frame = 0, ours = false;
  const max = () => document.documentElement.scrollHeight - window.innerHeight;
  const scrollableAncestor = (node: EventTarget | null, dy: number) => {
    let el = node instanceof Element ? node : null;
    while (el && el !== document.body && el !== document.documentElement) {
      if (el.matches("dialog, [data-native-scroll], .shortlist-tray, .catalog-filter-panel")) return true;
      const style = getComputedStyle(el);
      if (/(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 1) {
        if ((dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) || (dy < 0 && el.scrollTop > 0)) return true;
      }
      el = el.parentElement;
    }
    return false;
  };
  const tick = () => {
    current = lerp(current, target, 0.115);
    if (Math.abs(target - current) < 0.4) current = target;
    ours = true;
    window.scrollTo(0, current);
    frame = current === target ? 0 : requestAnimationFrame(tick);
  };
  const wheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    if (document.querySelector("dialog[open]") || scrollableAncestor(e.target, e.deltaY)) return;
    e.preventDefault();
    const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1;
    if (!frame) { current = window.scrollY; target = current; }
    target = clamp(target + e.deltaY * unit, 0, max());
    if (!frame) frame = requestAnimationFrame(tick);
  };
  const native = () => { if (ours) { ours = false; return; } if (!frame) { target = current = window.scrollY; } };
  const interrupt = () => { cancelAnimationFrame(frame); frame = 0; target = current = window.scrollY; };
  window.addEventListener("wheel", wheel, { passive: false });
  window.addEventListener("scroll", native, { passive: true });
  window.addEventListener("keydown", interrupt);
  window.addEventListener("pointerdown", interrupt);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", wheel);
    window.removeEventListener("scroll", native);
    window.removeEventListener("keydown", interrupt);
    window.removeEventListener("pointerdown", interrupt);
  };
}

/* ---------------------------------------------------------- page curtain */
// The curtain markup lives in the root layout; a tiny head script decides whether it plays.
function curtainTransitions() {
  const curtain = document.querySelector<HTMLElement>(".jmg-curtain");
  if (!curtain) return () => {};
  const click = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link || link.target && link.target !== "_self" || link.hasAttribute("download")) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || /^\/(api|documents|images|brand|fonts)\//.test(url.pathname) || /\.[a-z0-9]{2,5}$/i.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // same-page anchors stay instant
    e.preventDefault();
    try { sessionStorage.setItem("jmg-arrive", "1"); } catch {}
    curtain.dataset.state = "cover";
    window.setTimeout(() => { location.href = url.href; }, 520);
  };
  const restore = (e: PageTransitionEvent) => { if (e.persisted) curtain.dataset.state = ""; };
  document.addEventListener("click", click);
  window.addEventListener("pageshow", restore);
  return () => { document.removeEventListener("click", click); window.removeEventListener("pageshow", restore); };
}

/* ----------------------------------------------------- reveal choreography */
const revealSelector = [
  "main section h2", "main .eyebrow", "main section h3", "main .text-link", "main .button",
  "main blockquote", "main .career-entry-paths > a", "main .location-city-list > a", "main dl > div",
  "main .catalog-card", "main .faq details", "main .collection-facts > span", "main .page-hero-content p",
  "main .catalog-card-image img", "main .editorial-image img", "main .page-hero-image img", "main figure img",
].join(",");

function revealOnScroll() {
  if (!("IntersectionObserver" in window)) return () => {};
  let batch = 0, batchFrame = 0;
  const timers: number[] = [];
  const html = document.documentElement, loadedAt = performance.now();
  // Things already on screen wait for the curtain to lift before they arrive.
  const curtainWait = html.classList.contains("jmg-intro") ? 1250 : html.classList.contains("jmg-arrive") ? 380 : 0;
  // Headings and photos start fully clipped, and an observer never sees a fully clipped
  // element enter the screen, so they are watched through their parent instead.
  const proxies = new Map<Element, HTMLElement[]>();
  const watch = (el: HTMLElement) => {
    const target = el.matches("h2, img") && el.parentElement ? el.parentElement : el;
    const list = proxies.get(target);
    if (list) list.push(el); else { proxies.set(target, [el]); io.observe(target); }
  };
  const io = new IntersectionObserver((entries) => {
    const base = performance.now() - loadedAt < 1500 ? curtainWait : 0;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const els = proxies.get(entry.target) ?? [];
      proxies.delete(entry.target);
      io.unobserve(entry.target);
      for (const el of els) {
      el.style.setProperty("--jmg-delay", `${base + Math.min(batch++, 8) * 70}ms`);
      el.dataset.jmgReveal = "in";
      // once it has landed, hand transitions back to the element's own styles
      timers.push(window.setTimeout(() => { if (el.dataset.jmgReveal === "in") el.dataset.jmgReveal = "done"; }, base + Math.min(batch, 8) * 70 + 2600));
      }
    }
    if (!batchFrame) batchFrame = requestAnimationFrame(() => { batch = 0; batchFrame = 0; });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });
  const scan = () => document.querySelectorAll<HTMLElement>(revealSelector).forEach((el) => {
    if (el.dataset.jmgReveal || el.closest(".architectural-hero, header, dialog, .jmg-noreveal, .shortlist-tray")) return;
    el.dataset.jmgReveal = "wait";
    watch(el);
  });
  scan();
  const mo = new MutationObserver(() => requestAnimationFrame(scan));
  const main = document.querySelector("main");
  if (main) mo.observe(main, { childList: true, subtree: true });
  // Failsafe: nothing may stay hidden if an observer never fires.
  const failsafe = window.setTimeout(() => document.querySelectorAll<HTMLElement>('[data-jmg-reveal="wait"]').forEach((el) => {
    const r = (el.parentElement ?? el).getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.dataset.jmgReveal = "in";
  }), 2600);
  return () => {
    io.disconnect(); mo.disconnect(); clearTimeout(failsafe); cancelAnimationFrame(batchFrame); timers.forEach(clearTimeout);
    document.querySelectorAll<HTMLElement>("[data-jmg-reveal]").forEach((el) => { el.dataset.jmgReveal = "in"; });
  };
}

/* ------------------------------------------- scroll progress + page parallax */
function scrollEffects(bar: HTMLElement | null) {
  let frame = 0;
  const parallax = () => Array.from(document.querySelectorAll<HTMLElement>(".page-hero-image img, [data-jmg-parallax]"));
  let targets = parallax();
  const update = () => {
    frame = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? clamp(scrollY / max, 0, 1) : 0})`;
    for (const el of targets) {
      const r = el.parentElement?.getBoundingClientRect(); if (!r || r.bottom < 0 || r.top > innerHeight) continue;
      const speed = Number(el.dataset.jmgParallax || 0.12);
      el.style.translate = `0 ${((r.top + r.height / 2) - innerHeight / 2) * -speed}px`;
    }
  };
  const request = () => { if (!frame) frame = requestAnimationFrame(update); };
  const refresh = () => { targets = parallax(); request(); };
  addEventListener("scroll", request, { passive: true }); addEventListener("resize", refresh);
  const retry = window.setTimeout(refresh, 800);
  update();
  return () => {
    cancelAnimationFrame(frame); clearTimeout(retry);
    removeEventListener("scroll", request); removeEventListener("resize", refresh);
    targets.forEach((el) => { el.style.translate = ""; });
    if (bar) bar.style.transform = "scaleX(0)";
  };
}

/* -------------------------------------------- cursor, magnetism and tilt */
function pointerEffects(ring: HTMLElement | null, label: HTMLElement | null) {
  if (!ring || !label || !finePointer()) return () => {};
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, frame = 0, visible = false, scale = 1, targetScale = 1;
  let magnet: HTMLElement | null = null, tilt: HTMLElement | null = null;
  const draw = () => {
    rx = lerp(rx, x, 0.2); ry = lerp(ry, y, 0.2); scale = lerp(scale, targetScale, 0.18);
    ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%) scale(${scale})`;
    frame = Math.abs(rx - x) + Math.abs(ry - y) + Math.abs(scale - targetScale) > 0.1 ? requestAnimationFrame(draw) : 0;
  };
  const release = (el: HTMLElement | null, kind: "magnet" | "tilt") => {
    if (!el) return;
    el.dataset.jmgSettle = "1";
    if (kind === "magnet") el.style.translate = "";
    else { el.style.setProperty("--jmg-rx", "0deg"); el.style.setProperty("--jmg-ry", "0deg"); el.style.setProperty("--jmg-glare", "0"); }
  };
  const move = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    x = e.clientX; y = e.clientY;
    if (!visible) { visible = true; rx = x; ry = y; ring.dataset.on = "1"; }
    const target = e.target as Element | null;
    // contextual label
    const viewable = target?.closest?.(".catalog-card-image, .editorial-image a, .region-panel-media, .frame-image, .page-hero-image");
    const draggable = target?.closest?.("[data-cursor='drag']");
    const interactive = target?.closest?.("a, button, select, input, label, summary, [role='button']");
    const text = draggable ? "Drag" : viewable ? (target?.closest?.(".frame-image") ? "Explore" : "View") : "";
    if (label.textContent !== text) label.textContent = text;
    ring.dataset.mode = text ? "label" : interactive ? "hover" : "";
    targetScale = text ? 1 : interactive ? 1.6 : 1;
    // magnetic calls to action
    const m = target?.closest?.(".button, .nav-shortlist, .jmg-magnet") as HTMLElement | null;
    if (m !== magnet) { release(magnet, "magnet"); magnet = m; }
    if (magnet) {
      const r = magnet.getBoundingClientRect();
      delete magnet.dataset.jmgSettle;
      magnet.style.translate = `${(x - (r.left + r.width / 2)) * 0.22}px ${(y - (r.top + r.height / 2)) * 0.3}px`;
    }
    // card tilt with glare
    const t = target?.closest?.(".catalog-card, .career-entry-paths > a, .region-panel-media") as HTMLElement | null;
    if (t !== tilt) { release(tilt, "tilt"); tilt = t; }
    if (tilt) {
      const r = tilt.getBoundingClientRect(), px = (x - r.left) / r.width, py = (y - r.top) / r.height;
      delete tilt.dataset.jmgSettle;
      tilt.style.setProperty("--jmg-rx", `${(0.5 - py) * 5}deg`);
      tilt.style.setProperty("--jmg-ry", `${(px - 0.5) * 6}deg`);
      tilt.style.setProperty("--jmg-gx", `${px * 100}%`);
      tilt.style.setProperty("--jmg-gy", `${py * 100}%`);
      tilt.style.setProperty("--jmg-glare", "1");
    }
    if (!frame) frame = requestAnimationFrame(draw);
  };
  const leave = () => { visible = false; ring.dataset.on = ""; release(magnet, "magnet"); release(tilt, "tilt"); magnet = tilt = null; };
  const down = () => { targetScale *= 0.8; if (!frame) frame = requestAnimationFrame(draw); };
  const up = () => { targetScale = ring.dataset.mode === "hover" ? 1.6 : 1; if (!frame) frame = requestAnimationFrame(draw); };
  addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerleave", leave);
  document.documentElement.addEventListener("mouseleave", leave);
  addEventListener("pointerdown", down); addEventListener("pointerup", up);
  return () => {
    leave(); cancelAnimationFrame(frame);
    removeEventListener("pointermove", move);
    document.removeEventListener("pointerleave", leave);
    document.documentElement.removeEventListener("mouseleave", leave);
    removeEventListener("pointerdown", down); removeEventListener("pointerup", up);
  };
}

/* ------------------------------------------------- FLIP for filtered grids */
// Results still change instantly; cards glide from where they were to where they are.
function flipGrids() {
  const main = document.querySelector("main");
  if (!main) return () => {};
  const key = (card: Element) => card.querySelector("a[href]")?.getAttribute("href") || "";
  let last = new Map<string, DOMRect>();
  const measure = () => {
    const next = new Map<string, DOMRect>();
    main.querySelectorAll(".catalog-card").forEach((card) => {
      const r = card.getBoundingClientRect();
      next.set(key(card), new DOMRect(r.left + scrollX, r.top + scrollY, r.width, r.height));
    });
    return next;
  };
  last = measure();
  let pending = 0;
  const flip = () => {
    pending = 0;
    const now = measure();
    main.querySelectorAll<HTMLElement>(".catalog-card").forEach((card) => {
      const before = last.get(key(card)), after = now.get(key(card));
      if (!after || typeof card.animate !== "function") return;
      if (before) {
        const dx = before.left - after.left, dy = before.top - after.top;
        if (Math.abs(dx) + Math.abs(dy) < 2) return;
        if (Math.abs(dy) > innerHeight * 1.5) return; // far moves would just streak across the page
        card.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: "none" }], { duration: 520, easing: "cubic-bezier(.2,1.15,.3,1)" });
      } else {
        card.animate([{ opacity: 0, transform: "translateY(24px) scale(.97)" }, { opacity: 1, transform: "none" }], { duration: 460, easing: "cubic-bezier(.2,.8,.2,1)" });
      }
    });
    last = now;
  };
  const mo = new MutationObserver((records) => {
    if (!records.some((r) => Array.from(r.addedNodes).concat(Array.from(r.removedNodes)).some((n) => n instanceof Element && (n.matches(".catalog-card") || n.querySelector?.(".catalog-card"))))) return;
    if (!pending) pending = requestAnimationFrame(flip);
  });
  mo.observe(main, { childList: true, subtree: true });
  let resize = 0;
  const onResize = () => { clearTimeout(resize); resize = window.setTimeout(() => { last = measure(); }, 200); };
  addEventListener("resize", onResize);
  return () => { mo.disconnect(); cancelAnimationFrame(pending); removeEventListener("resize", onResize); };
}

/* ------------------------------------ saving a home: it flies to "Saved" */
// A small spring simulation (semi-implicit Euler) pulls the thumbnail into the shortlist button,
// then the button itself rings like a struck bell.
function shortlistFlight() {
  const springScale = (el: HTMLElement) => {
    let s = 1, v = 7, frame = 0;
    const step = () => {
      const a = -260 * (s - 1) - 13 * v; v += a / 60; s += v / 60;
      el.style.scale = String(s);
      if (Math.abs(v) + Math.abs(s - 1) > 0.002) frame = requestAnimationFrame(step); else { el.style.scale = ""; }
    };
    cancelAnimationFrame(frame); step();
  };
  const click = (e: MouseEvent) => {
    const button = (e.target as Element | null)?.closest?.(".save-model") as HTMLElement | null;
    if (!button || button.getAttribute("aria-pressed") === "true") return;
    const scope = button.closest(".catalog-card, .editorial-stage, article, section, main");
    const img = scope?.querySelector<HTMLImageElement>("img");
    window.setTimeout(() => {
      if (button.getAttribute("aria-pressed") !== "true" || !img) return; // limit reached or not saved
      const target = Array.from(document.querySelectorAll<HTMLElement>(".nav-shortlist")).find((el) => el.getBoundingClientRect().width > 0);
      if (!target) return;
      const from = img.getBoundingClientRect(), to = target.getBoundingClientRect();
      const size = 92;
      const flyer = document.createElement("div");
      flyer.className = "jmg-flyer";
      flyer.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
      document.body.appendChild(flyer);
      let px = from.left + from.width / 2, py = from.top + from.height / 2;
      let vx = (Math.random() - 0.5) * 300, vy = -900;
      const tx = to.left + to.width / 2, ty = to.top + to.height / 2;
      let t = 0, frame = 0;
      const step = () => {
        const dt = 1 / 60; t += dt;
        const k = 60 + t * 520, c = 9 + t * 22; // the pull tightens as it travels
        vx += (k * (tx - px) - c * vx) * dt; vy += (k * (ty - py) - c * vy + 900 * Math.max(0, 0.35 - t)) * dt;
        px += vx * dt; py += vy * dt;
        const d = Math.hypot(tx - px, ty - py), sc = clamp(d / 260, 0.18, 1);
        flyer.style.transform = `translate3d(${px - size / 2}px,${py - size / 2}px,0) scale(${sc}) rotate(${vx * 0.02}deg)`;
        if ((d < 10 && Math.hypot(vx, vy) < 220) || t > 2.2) { flyer.remove(); springScale(target); return; }
        frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
      void frame;
    }, 30);
  };
  document.addEventListener("click", click, true);
  return () => document.removeEventListener("click", click, true);
}

/* ------------------------------------------------------------- director */
export function MotionDirector() {
  const on = useCinema();
  const bar = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null), label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const html = document.documentElement;
    if (!on) { html.classList.remove("jmg-cinema"); return; }
    html.classList.add("jmg-cinema");
    const stops = [
      revealOnScroll(),
      scrollEffects(bar.current),
      curtainTransitions(),
      flipGrids(),
      shortlistFlight(),
      finePointer() ? smoothWheel() : () => {},
      pointerEffects(ring.current, label.current),
    ];
    return () => { stops.forEach((stop) => stop()); html.classList.remove("jmg-cinema"); };
  }, [on]);
  return <>
    <div className="jmg-progress" aria-hidden="true"><div ref={bar} /></div>
    <div className="jmg-cursor" ref={ring} aria-hidden="true"><span ref={label} /></div>
  </>;
}

/* --------------------------------------------------------- shared pieces */
/** Counts up once it scrolls into view. The final number is server-rendered, so it's always correct without JS. */
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, duration = 1400 }: { value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const on = useCinema();
  const format = (n: number) => prefix + n.toLocaleString("en-PH", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = format(value);
    if (!on || !("IntersectionObserver" in window)) return;
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const p = clamp((now - start) / duration, 0, 1), eased = 1 - Math.pow(1 - p, 4);
        el.textContent = format(value * eased);
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); el.textContent = format(value); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, on]);
  return <span ref={ref} suppressHydrationWarning>{format(value)}</span>;
}

/** Splits a line into words and letters for the hero entrance. Screen readers get the plain text from the heading's aria-label. */
export function SplitLine({ text, offset = 0 }: { text: string; offset?: number }): ReactNode {
  let i = offset;
  return text.split(" ").map((word, w, words) => <Fragment key={w}>
    <span className="jmg-word">
      {Array.from(word).map((ch, c) => <span className="jmg-ch" key={c} style={{ ["--i" as string]: i++ }}>{ch}</span>)}
    </span>
    {w < words.length - 1 ? " " : null}
  </Fragment>);
}
