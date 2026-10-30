"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { areas, developments, properties } from "./content";
import { CountUp, useCinema } from "./cinema";

/* ======================================================= collection marquee */
// Two rows of project names drifting in opposite directions. Scrolling the page
// pushes them faster and leans them into the motion; hovering pauses them.
export function CollectionMarquee() {
  const on = useCinema();
  const rows = useRef<HTMLDivElement>(null);
  const names = useMemo(() => [...new Set(developments.map((d) => d.name))], []);
  const half = Math.ceil(names.length / 2);
  const lines = [names.slice(0, half), names.slice(half)];
  useEffect(() => {
    const host = rows.current;
    if (!on || !host) return;
    const tracks = Array.from(host.querySelectorAll<HTMLElement>(".marquee-track"));
    let raf = 0, last = scrollY, boost = 0, paused = false, visible = true;
    const offsets = tracks.map(() => 0);
    const tick = () => {
      const dy = scrollY - last; last = scrollY;
      boost += (Math.max(-40, Math.min(40, dy)) - boost) * 0.1;
      tracks.forEach((track, i) => {
        const dir = i % 2 ? 1 : -1, width = track.scrollWidth / 2;
        const speed = paused ? 0 : 0.45 + Math.abs(boost) * 0.25;
        offsets[i] = (offsets[i] + dir * speed + width) % width;
        track.style.transform = `translate3d(${-offsets[i]}px,0,0) skewX(${(-boost * 0.35 * dir).toFixed(2)}deg)`;
      });
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(tick); });
    io.observe(host);
    const enter = () => { paused = true; }, leave = () => { paused = false; };
    host.addEventListener("pointerenter", enter); host.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); host.removeEventListener("pointerenter", enter); host.removeEventListener("pointerleave", leave); tracks.forEach((t) => { t.style.transform = ""; }); };
  }, [on]);
  return <section className="collection-marquee" aria-label="Projects in the JMG collection">
    <p className="eyebrow wrap">IN THE COLLECTION · {names.length} PROJECTS</p>
    <div className="marquee-rows" ref={rows}>
      {lines.map((line, i) => <div className="marquee-row" key={i}>
        <div className="marquee-track">
          {[0, 1].map((copy) => <span className="marquee-set" key={copy} aria-hidden={copy === 1 || undefined}>
            {line.map((name) => <span className="marquee-item" key={name}>{name}<i aria-hidden="true">✦</i></span>)}
          </span>)}
        </div>
      </div>)}
    </div>
  </section>;
}

/* ========================================================== region journey */
// A pinned, horizontal walk through every region that has published models.
// The page takes on each region's palette and a route line draws as you travel.
// Without motion (or on phones) it is a plain swipeable row.
const palettes: Record<string, [string, string, string]> = {
  "Metro Manila": ["#1b2a33", "#f1ece1", "#d7b56a"],
  Bulacan: ["#173c2e", "#eef0e4", "#d1b46b"],
  Pampanga: ["#3b2a1c", "#f5ecdc", "#e2a457"],
  Tarlac: ["#2f3a1f", "#eef1df", "#c9c26a"],
  Cavite: ["#123540", "#e7f1ef", "#7ec3c0"],
  Rizal: ["#253323", "#edf1e6", "#a8c98b"],
  Batangas: ["#0f2f3b", "#e6f0f2", "#6fb5c9"],
  Quezon: ["#2c3420", "#f0efe2", "#c6b46a"],
};
const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixHex = (a: string, b: string, t: number) => { const x = hexToRgb(a), y = hexToRgb(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`; };

export function RegionJourney() {
  const on = useCinema();
  const host = useRef<HTMLElement>(null), stage = useRef<HTMLDivElement>(null), track = useRef<HTMLDivElement>(null), route = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(0);
  const regions = useMemo(() => areas.map((area) => {
    const models = properties.filter((p) => p.area === area);
    const projects = [...new Set(models.map((p) => p.developmentId))].map((id) => developments.find((d) => d.id === id)).filter(Boolean);
    const cities = [...new Set(models.map((p) => p.city))];
    const lead = models.find((p) => /display|exterior|facade|front/i.test(p.image)) || models[0];
    return { area, models: models.length, projects: projects.length, cities, image: lead?.image, alt: lead?.imageAlt, caption: lead ? `${lead.title} · ${developments.find((d) => d.id === lead.developmentId)?.name ?? ""}` : "" };
  }).filter((r) => r.models > 0 && r.image), []);

  useEffect(() => {
    const section = host.current, sticky = stage.current, row = track.current;
    if (!section || !sticky || !row) return;
    const wide = window.matchMedia("(min-width: 900px)");
    let raf = 0, current = -1;
    const reset = () => { section.style.removeProperty("--journey-h"); row.style.transform = ""; sticky.style.removeProperty("--j-bg"); sticky.style.removeProperty("--j-ink"); sticky.style.removeProperty("--j-accent"); if (route.current) route.current.style.strokeDashoffset = ""; };
    const update = () => {
      raf = 0;
      if (!on || !wide.matches) { reset(); section.dataset.pinned = ""; return; }
      section.dataset.pinned = "1";
      const distance = row.scrollWidth - innerWidth;
      section.style.setProperty("--journey-h", `${distance + innerHeight}px`);
      const r = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      row.style.transform = `translate3d(${-progress * distance}px,0,0)`;
      const f = progress * (regions.length - 1), i = Math.floor(f), t = f - i;
      const a = palettes[regions[i].area] ?? palettes.Bulacan, b = palettes[regions[Math.min(i + 1, regions.length - 1)].area] ?? a;
      sticky.style.setProperty("--j-bg", mixHex(a[0], b[0], t));
      sticky.style.setProperty("--j-ink", mixHex(a[1], b[1], t));
      sticky.style.setProperty("--j-accent", mixHex(a[2], b[2], t));
      if (route.current) route.current.style.strokeDashoffset = String(1 - progress);
      row.querySelectorAll<HTMLElement>(".region-panel-media img").forEach((img, k) => {
        const offset = (k / Math.max(1, regions.length - 1) - progress) * 90;
        img.style.translate = `${offset}px 0`;
      });
      const next = Math.round(f);
      if (next !== current) { current = next; setActive(next); }
    };
    const request = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener("scroll", request, { passive: true }); addEventListener("resize", request);
    wide.addEventListener?.("change", request);
    update();
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", request); removeEventListener("resize", request); wide.removeEventListener?.("change", request); reset(); row.querySelectorAll<HTMLElement>(".region-panel-media img").forEach((img) => { img.style.translate = ""; }); };
  }, [on, regions]);

  const n = regions.length;
  const dots = regions.map((_, i) => 40 + (i * 920) / Math.max(1, n - 1));
  const yAt = (i: number) => (i % 2 ? 30 : 10);
  const path = dots.map((x, i) => {
    if (!i) return `M${x},${yAt(i)}`;
    const px = dots[i - 1], dx = (x - px) / 2;
    return `C${px + dx},${yAt(i - 1)} ${x - dx},${yAt(i)} ${x},${yAt(i)}`;
  }).join(" ");
  return <section className="region-journey" ref={host} aria-labelledby="journey-title">
    <div className="journey-stage" ref={stage}>
      <div className="journey-head wrap">
        <div>
          <span className="eyebrow">02 / THE JOURNEY</span>
          <h2 id="journey-title">From the city <em>to the coast.</em></h2>
        </div>
        <svg className="journey-route" viewBox="0 0 1000 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path d={path} className="route-ghost" />
          <path ref={route} d={path} pathLength={1} className="route-live" />
          {dots.map((x, i) => <circle key={i} cx={x} cy={yAt(i)} r={i === active ? 6 : 4} className={i <= active ? "is-lit" : ""} />)}
        </svg>
      </div>
      <div className="journey-track" ref={track}>
        {regions.map((r, i) => <article className="region-panel" key={r.area} data-current={i === active || undefined}>
          <a className="region-panel-media" href={`/properties?area=${encodeURIComponent(r.area)}`} aria-label={`Explore ${r.area}`} data-cursor="drag">
            <img src={r.image} alt={r.alt} loading="lazy" decoding="async" />
            <span className="region-caption">{r.caption}</span>
          </a>
          <div className="region-panel-copy">
            <span className="region-index">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            <h3>{r.area}</h3>
            <p className="region-stats"><b><CountUp value={r.models} /></b> models & units <span>·</span> <b><CountUp value={r.projects} /></b> {r.projects === 1 ? "project" : "projects"}</p>
            <p className="region-cities">{r.cities.slice(0, 5).join(" · ")}{r.cities.length > 5 ? ` · +${r.cities.length - 5} more` : ""}</p>
            <a className="button cream" href={`/properties?area=${encodeURIComponent(r.area)}`}>Explore {r.area}<ArrowUpRight size={18} /></a>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}

/* ============================================================== estimator */
// A planning estimate, clearly labelled as one. Results and the chart update live.
const peso = (n: number) => "₱" + Math.round(n).toLocaleString("en-PH");
const buckets = [3, 5, 10, 20, 50, 100, 150, 200].map((m) => m * 1_000_000);

function useTween(value: number, on: boolean) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (!on) { setShown(value); from.current = value; return; }
    const start = performance.now(), a = from.current;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 420), e = 1 - Math.pow(1 - p, 3);
      const v = a + (value - a) * e; from.current = v; setShown(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, on]);
  return shown;
}

export function MortgageEstimator() {
  const on = useCinema();
  const [price, setPrice] = useState(4_500_000);
  const [down, setDown] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(6.5);
  const loan = price * (1 - down / 100), n = years * 12, r = rate / 100 / 12;
  const monthly = r ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n;
  const total = monthly * n, interest = total - loan;
  const shownMonthly = useTween(monthly, on);
  const share = total > 0 ? loan / total : 1;
  // remaining balance at the end of each year, for the chart
  const balance = Array.from({ length: years + 1 }, (_, y) => {
    const k = y * 12;
    return r ? loan * (Math.pow(1 + r, n) - Math.pow(1 + r, k)) / (Math.pow(1 + r, n) - 1) : loan * (1 - k / n);
  });
  const W = 520, H = 170;
  const pts = balance.map((b, i) => [(i / years) * W, H - (b / Math.max(1, loan)) * (H - 10)]);
  const area = `M0,${H} ` + pts.map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + ` L${W},${H} Z`;
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const bucket = buckets.find((b) => b >= price) ?? buckets[buckets.length - 1];
  const C = 2 * Math.PI * 54;
  return <section className="estimator section wrap" id="estimate" aria-labelledby="estimate-title">
    <div className="estimator-heading">
      <span className="eyebrow">05 / PLAN THE NUMBERS</span>
      <h2 id="estimate-title">What could the <em>monthly look like?</em></h2>
      <p>Move the sliders for a quick planning estimate. Actual rates, terms and approval depend on the lender (bank, Pag-IBIG or in-house financing), so ask JMG for the developer&apos;s own computation.</p>
    </div>
    <div className="estimator-body">
      <div className="estimator-controls">
        <label><span>Property price <b>{peso(price)}</b></span>
          <input type="range" min={1_000_000} max={30_000_000} step={100_000} value={price} onChange={(e) => setPrice(Number(e.target.value))} style={{ ["--fill" as string]: `${((price - 1e6) / 29e6) * 100}%` }} />
        </label>
        <label><span>Down payment <b>{down}% · {peso(price * down / 100)}</b></span>
          <input type="range" min={0} max={50} step={1} value={down} onChange={(e) => setDown(Number(e.target.value))} style={{ ["--fill" as string]: `${(down / 50) * 100}%` }} />
        </label>
        <label><span>Loan term <b>{years} years</b></span>
          <input type="range" min={5} max={30} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} style={{ ["--fill" as string]: `${((years - 5) / 25) * 100}%` }} />
        </label>
        <label><span>Interest rate (per year) <b>{rate.toFixed(2)}%</b></span>
          <input type="range" min={3} max={12} step={0.25} value={rate} onChange={(e) => setRate(Number(e.target.value))} style={{ ["--fill" as string]: `${((rate - 3) / 9) * 100}%` }} />
        </label>
      </div>
      <div className="estimator-result" aria-live="polite">
        <div className="estimator-ring">
          <svg viewBox="0 0 128 128" aria-hidden="true">
            <circle cx="64" cy="64" r="54" className="ring-track" />
            <circle cx="64" cy="64" r="54" className="ring-interest" />
            <circle cx="64" cy="64" r="54" className="ring-principal" style={{ strokeDasharray: `${C * share} ${C}` }} />
          </svg>
          <div><small>Estimated monthly</small><strong>{peso(shownMonthly)}</strong></div>
        </div>
        <dl className="estimator-figures">
          <div><dt><i className="key principal" />Loan amount</dt><dd>{peso(loan)}</dd></div>
          <div><dt><i className="key interest" />Total interest</dt><dd>{peso(interest)}</dd></div>
          <div><dt>Total of payments</dt><dd>{peso(total)}</dd></div>
        </dl>
        <figure className="estimator-chart">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={`Loan balance falls from ${peso(loan)} to zero over ${years} years`}>
            <path d={area} className="chart-area" />
            <path d={line} className="chart-line" />
          </svg>
          <figcaption><span>Balance today</span><span>Year {years}</span></figcaption>
        </figure>
        <div className="estimator-actions">
          <a className="button cream" href={`/properties?browse=models&max=${bucket}`}>Homes up to ₱{bucket / 1_000_000} million<ArrowUpRight size={18} /></a>
          <a className="text-link" href="/contact#send-inquiry">Ask JMG for a computation<ArrowUpRight size={17} /></a>
        </div>
      </div>
    </div>
  </section>;
}
