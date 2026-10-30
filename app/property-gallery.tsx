"use client";
import { useRef, useState } from "react";
import { MotionImage } from "./motion";
import { ChevronLeft, ChevronRight, Maximize, X } from "lucide-react";

type GalleryImage = { src: string; alt: string; caption: string; sourceUrl?: string; width?: number; height?: number };
export default function PropertyGallery({
  images,
  title,
  alt,
  caption,
  stage = false,
}: {
  images: (string | GalleryImage)[];
  title: string;
  alt: string;
  caption: string;
  stage?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const items: GalleryImage[] = images.map(image => typeof image === "string" ? {src:image,alt,caption} : image);
  const current = items[index] || items[0];
  const move = (amount: number) =>
    setIndex((i) => (i + amount + images.length) % images.length);
  return (
    <>
      <div
        className={`property-gallery ${stage ? "model-image-stage" : ""}`}
        id={stage ? "imagery" : undefined}
      >
        {items.map((image, i) => (
          <button
            className="model-photo"
            key={image.src}
            onClick={() => {
              setIndex(i);
              dialog.current?.showModal();
            }}
            aria-label={`View ${title} image ${i + 1}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width || 1200}
              height={image.height || 800}
              loading={stage && i === 0 ? "eager" : "lazy"}
              fetchPriority={stage && i === 0 ? "high" : "auto"}
            />
            <span>
              <Maximize size={16} /> View image
            </span>
          </button>
        ))}
      </div>
      <p className="catalog-note">{items.length === 1 ? current.caption : caption}</p>
      <dialog
        className="model-lightbox"
        ref={dialog}
        aria-label={`${title} image gallery`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        <button
          autoFocus
          className="model-lightbox-close"
          onClick={() => dialog.current?.close()}
          aria-label="Close property gallery"
        >
          <X />
        </button>
        <figure>
          <MotionImage src={current.src} alt={current.alt} />
          <figcaption>{current.caption}{current.sourceUrl && <> · <a href={current.sourceUrl} target="_blank" rel="noopener noreferrer">Image source ↗</a></>}</figcaption>
        </figure>
        {images.length > 1 && (
          <div className="model-gallery-controls">
            <button
              onClick={() => move(-1)}
              aria-label="Previous property image"
            >
              <ChevronLeft />
            </button>
            <span>
              {index + 1} / {images.length}
            </span>
            <button onClick={() => move(1)} aria-label="Next property image">
              <ChevronRight />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
