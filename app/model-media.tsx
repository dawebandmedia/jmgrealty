"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  Maximize,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import { MotionImage, useContentMotion } from "./motion";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";

type View = { zoom: number; x: number; y: number };
type Point = { x: number; y: number };
const initialView: View = { zoom: 1, x: 0, y: 0 };

export default function ModelMedia({
  title,
  media,
}: {
  title: string;
  media: OfficialModelMedia;
}) {
  const [collection, setCollection] = useState<"interiors" | "plans" | null>(null);
  const [index, setIndex] = useState(0);
  const [view, updateView] = useState<View>(initialView);
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [dragging, setDragging] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenAvailable, setFullscreenAvailable] = useState(false);
  const [viewerMessage, setViewerMessage] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  useContentMotion(viewport, `${collection}/${index}`);
  const viewRef = useRef<View>(initialView);
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef({ view: initialView, center: { x: 0, y: 0 }, distance: 0 });
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const helpId = useId();
  const publisher = media.publisher || "Amaresa";
  const images = collection === "plans" ? media.floorPlans : media.interiorImages;
  const asset = images[index];
  const fit = asset
    ? Math.min(
        Math.max(1, size.width - 32) / asset.width,
        Math.max(1, size.height - 32) / asset.height,
        1,
      )
    : 1;
  const imageWidth = (asset?.width || 1) * fit;
  const imageHeight = (asset?.height || 1) * fit;

  function setView(next: View) {
    const zoom = Math.min(6, Math.max(1, next.zoom));
    const maxX = Math.max(0, (imageWidth * zoom - size.width) / 2 + 16);
    const maxY = Math.max(0, (imageHeight * zoom - size.height) / 2 + 16);
    const value = {
      zoom,
      x: zoom === 1 ? 0 : Math.max(-maxX, Math.min(maxX, next.x)),
      y: zoom === 1 ? 0 : Math.max(-maxY, Math.min(maxY, next.y)),
    };
    viewRef.current = value;
    updateView(value);
  }

  function resetView() {
    viewRef.current = initialView;
    updateView(initialView);
    pointers.current.clear();
    setDragging(false);
    setViewerMessage("");
  }

  function open(
    kind: "interiors" | "plans",
    at: number,
    button: HTMLButtonElement,
  ) {
    returnFocus.current = button;
    resetView();
    setIndex(at);
    setCollection(kind);
  }

  function close() {
    if (document.fullscreenElement === dialog.current)
      void document.exitFullscreen().catch(() => {});
    dialog.current?.close();
  }

  function move(amount: number) {
    resetView();
    setIndex((current) => (current + amount + images.length) % images.length);
  }

  useEffect(() => {
    if (!collection || !dialog.current) return;
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const element = viewport.current;
    if (!element) return;
    const resize = () => {
      setSize({ width: element.clientWidth, height: element.clientHeight });
      viewRef.current = initialView;
      updateView(initialView);
    };
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
    observer?.observe(element);
    window.addEventListener("resize",resize,{passive:true});
    resize();
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize",resize);
      document.body.style.overflow = previous;
    };
  }, [collection]);

  useEffect(() => {
    setFullscreenAvailable(!!document.fullscreenEnabled);
    const changed = () => setFullscreen(document.fullscreenElement === dialog.current);
    document.addEventListener("fullscreenchange", changed);
    return () => document.removeEventListener("fullscreenchange", changed);
  }, []);

  function pointerGeometry() {
    const points = [...pointers.current.values()];
    const center = points.reduce(
      (total, point) => ({ x: total.x + point.x / points.length, y: total.y + point.y / points.length }),
      { x: 0, y: 0 },
    );
    const distance = points.length > 1
      ? Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
      : 0;
    return { center, distance };
  }

  function startGesture() {
    gesture.current = { view: viewRef.current, ...pointerGeometry() };
  }

  function pointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    startGesture();
    setDragging(true);
  }

  function pointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const current = pointerGeometry();
    const start = gesture.current;
    const zoom = pointers.current.size > 1 && start.distance > 0
      ? start.view.zoom * current.distance / start.distance
      : start.view.zoom;
    setView({
      zoom,
      x: start.view.x + current.center.x - start.center.x,
      y: start.view.y + current.center.y - start.center.y,
    });
  }

  function pointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    pointers.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    startGesture();
    setDragging(pointers.current.size > 0);
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement === dialog.current)
        await document.exitFullscreen();
      else await dialog.current?.requestFullscreen();
    } catch {
      setViewerMessage("Full-screen mode is unavailable here. You can still zoom or open the image separately.");
    }
  }

  function originalLink(image: OfficialModelImage) {
    return (
      <a className="text-link" href={image.src} target="_blank" rel="noreferrer">
        {image.downloadLabel || "Open original image"} <ArrowUpRight size={16} />
      </a>
    );
  }

  return (
    <>
      {media.interiorImages.length > 0 && (
        <section className="model-story-section official-model-media" id={media.galleryId || "interiors"}>
          <span className="eyebrow">{media.galleryEyebrow || "OFFICIAL AMARESA MARILAO / INTERIORS"}</span>
          <div className="official-media-heading">
            <h2>{media.galleryHeading || <>Inside <em>{title}.</em></>}</h2>
            <span>{media.interiorImages.length} {media.interiorImages.length === 1 ? (media.imageNoun || "photographs").replace(/s$/, "") : media.imageNoun || "photographs"}</span>
          </div>
          <p>{media.galleryDescription || "Explore the model interiors published by Amaresa. Select a photograph for a closer look."}</p>
          <div className="official-interior-grid">
            {media.interiorImages.map((image, at) => (
              <figure key={image.src}>
                <button
                  className="official-interior-photo"
                  aria-label={`Enlarge ${title}: ${image.label}`}
                  onClick={(event) => open("interiors", at, event.currentTarget)}
                >
                  <img src={image.displaySrc || image.src} alt={`${title} — ${image.label}, published by ${publisher}`} width={image.width} height={image.height} loading="lazy" />
                  <span className="official-media-enlarge"><Maximize size={17} /><span>{media.publisher ? "View image" : "View photograph"}</span></span>
                </button>
                <figcaption><span>{String(at + 1).padStart(2, "0")}</span>{image.label}</figcaption>
              </figure>
            ))}
          </div>
          <p className="official-media-source">{media.gallerySourceNote || "Official model photographs"} · <a href={media.sourceUrl} target="_blank" rel="noreferrer">{media.publisher || "Amaresa Marilao"} <ArrowUpRight size={14} /></a>. {media.galleryDisclaimer ?? "Furnishings and finishes shown may vary from those offered; confirm inclusions with JMG."}</p>
        </section>
      )}
      {media.floorPlans.length > 0 && (
        <section className="model-story-section official-model-media" id={media.plansId || "floor-plans"}>
          <span className="eyebrow">{media.floorPlanEyebrow || (media.publisher ? "PUBLISHED SOURCE / ORIGINAL DRAWINGS" : "OFFICIAL AMARESA MARILAO / ORIGINAL DRAWINGS")}</span>
          <h2>{media.floorPlanHeading || <>Floor <em>Plan.</em></>}</h2>
          <p>{media.floorPlanDescription || <>The original published drawing for {title}. Enlarge it to inspect the layout, or open the original-resolution image.</>}</p>
          <div className="official-floor-plans">
            {media.floorPlans.map((image, at) => (
              <figure key={image.src}>
                <div className="official-plan-caption">
                  <h3>{image.label}</h3>
                  {image.levels?.length ? <p>{image.levels.join(" · ")}</p> : null}
                </div>
                <button className="official-plan-preview" aria-label={`Inspect ${title} original floor plan${media.floorPlans.length > 1 ? ` ${at + 1}` : ""}`} onClick={(event) => open("plans", at, event.currentTarget)}>
                  <img src={image.displaySrc || image.src} alt={`${title} source floor plan${image.levels?.length ? ` showing ${image.levels.join(", ")}` : ""}, published by ${publisher}`} width={image.width} height={image.height} loading="lazy" />
                </button>
                <figcaption className="official-plan-actions">
                  <button className="button outline" onClick={(event) => open("plans", at, event.currentTarget)}><Expand size={18} />Inspect floor plan</button>
                  {originalLink(image)}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="official-media-source">Original artwork preserved as published · <a href={media.floorPlanSourceUrl || media.sourceUrl} target="_blank" rel="noreferrer">{media.publisher ? "View the source" : "View the official model page"} <ArrowUpRight size={14} /></a>. {media.floorPlanSourceNote || "Amaresa states that plans may change; confirm the applicable plan and specifications with JMG."}</p>
        </section>
      )}
      {media.limitations.length > 0 && <div className="official-media-limits">{media.limitations.map((note) => <p key={note}>{note}</p>)}</div>}
      <dialog
        ref={dialog}
        className="official-media-dialog"
        aria-labelledby={titleId}
        onClose={() => {
          setCollection(null);
          resetView();
          returnFocus.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        onKeyDown={(event) => {
          if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement) return;
          if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "+", "=", "-", "0", "Home"].includes(event.key)) event.preventDefault();
          if (event.key === "+" || event.key === "=") setView({ ...viewRef.current, zoom: viewRef.current.zoom + 0.5 });
          if (event.key === "-") setView({ ...viewRef.current, zoom: viewRef.current.zoom - 0.5 });
          if (event.key === "0" || event.key === "Home") resetView();
          if (viewRef.current.zoom > 1) {
            if (event.key === "ArrowLeft") setView({ ...viewRef.current, x: viewRef.current.x + 60 });
            if (event.key === "ArrowRight") setView({ ...viewRef.current, x: viewRef.current.x - 60 });
            if (event.key === "ArrowUp") setView({ ...viewRef.current, y: viewRef.current.y + 60 });
            if (event.key === "ArrowDown") setView({ ...viewRef.current, y: viewRef.current.y - 60 });
          } else if (images.length > 1) {
            if (event.key === "ArrowRight") move(1);
            if (event.key === "ArrowLeft") move(-1);
          }
        }}
      >
        {collection && asset && (
          <div className="official-viewer-content">
            <header className="official-viewer-header">
              <div><span className="eyebrow">{title} / {collection === "plans" ? "ORIGINAL FLOOR PLAN" : media.galleryEyebrow ? "IMAGE GALLERY" : "MODEL INTERIORS"}</span><h2 id={titleId}>{asset.label}</h2></div>
              <button autoFocus className="icon-button" aria-label="Close image viewer" onClick={close}><X size={22} /></button>
            </header>
            <div className="official-viewer-toolbar" role="group" aria-label="Image view controls">
              <button aria-label="Zoom out" disabled={view.zoom <= 1} onClick={() => setView({ ...viewRef.current, zoom: viewRef.current.zoom - 0.5 })}><Minus size={19} /></button>
              <output aria-live="polite" aria-label="Image zoom">{Math.round(view.zoom * 100)}%</output>
              <button aria-label="Zoom in" disabled={view.zoom >= 6} onClick={() => setView({ ...viewRef.current, zoom: viewRef.current.zoom + 0.5 })}><Plus size={19} /></button>
              <button onClick={resetView} aria-label="Fit entire image to view"><Maximize size={17} /><span>Fit to view</span></button>
              <button onClick={resetView} aria-label="Reset image view"><RotateCcw size={17} /><span>Reset</span></button>
              {fullscreenAvailable && <button onClick={toggleFullscreen} aria-label={fullscreen ? "Exit full screen" : "View full screen"}><Expand size={17} /><span>{fullscreen ? "Exit full screen" : "Full screen"}</span></button>}
            </div>
            <div
              ref={viewport}
              className={`official-viewer-viewport ${view.zoom > 1 ? "can-pan" : ""} ${dragging ? "is-dragging" : ""}`}
              role="region"
              aria-label={`${title} ${collection === "plans" ? "floor plan" : media.imageNoun ? "gallery" : "interior photograph"} image view`}
              aria-describedby={helpId}
              tabIndex={0}
              onPointerDown={pointerDown}
              onPointerMove={pointerMove}
              onPointerUp={pointerUp}
              onPointerCancel={pointerUp}
              onLostPointerCapture={(event) => { pointers.current.delete(event.pointerId); if (!pointers.current.size) setDragging(false); }}
            >
              <div className="official-viewer-image-layer" style={{ width: imageWidth, height: imageHeight, transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) scale(${view.zoom})` }}>
                {collection === "plans" ? <img src={asset.viewerSrc || asset.src} alt={`${title} — ${asset.label}`} width={asset.width} height={asset.height} draggable={false}/> : <MotionImage src={asset.viewerSrc || asset.src} alt={`${title} — ${asset.label}`} width={asset.width} height={asset.height} draggable={false}/>}
              </div>
            </div>
            <div className="official-viewer-footer">
              <p id={helpId}>Zoom, then drag to inspect. On touch screens, pinch to zoom. Focus the image and use + / −, arrow keys, or 0 to reset.</p>
              {originalLink(asset)}
            </div>
            {viewerMessage && <p className="official-viewer-message" role="status">{viewerMessage}</p>}
            {images.length > 1 && (
              <div className="official-viewer-navigation">
                <button className="icon-button" aria-label="Previous image" onClick={() => move(-1)}><ChevronLeft /></button>
                <div className="official-viewer-thumbnails" aria-label="Choose an image">
                  {images.map((image, at) => <button key={image.src} aria-label={`Show image ${at + 1}: ${image.label}`} aria-pressed={at === index} onClick={() => { resetView(); setIndex(at); }}><img src={image.displaySrc || image.src} alt="" width={image.width} height={image.height} loading="lazy" /></button>)}
                </div>
                <span className="official-viewer-count" aria-live="polite">{index + 1} / {images.length}</span>
                <button className="icon-button" aria-label="Next image" onClick={() => move(1)}><ChevronRight /></button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
