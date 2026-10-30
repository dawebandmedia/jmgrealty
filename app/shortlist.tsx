"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Bookmark, Check, ArrowUpRight, Columns3 } from "lucide-react";
import { properties, type Property } from "./content";
import { ShortlistContents } from "./comparison";

const STORAGE_KEY = "jmg-saved-models-v1";
type Shortlist = {
  ids: string[];
  toggle: (id: string) => void;
  open: () => void;
};
const ShortlistContext = createContext<Shortlist>({
  ids: [],
  toggle: () => {},
  open: () => {},
});

export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]",
      );
      if (Array.isArray(saved))
        setIds(
          [
            ...new Set(
              saved.filter(
                (id): id is string =>
                  typeof id === "string" && properties.some((p) => p.id === id),
              ),
            ),
          ].slice(0, 3),
        );
    } catch {
      /* A private browser session can still keep a shortlist on this page. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* Browser storage may be disabled. */
    }
  }, [ids, ready]);
  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setMessage(""), 4500);
    return () => clearTimeout(timeout);
  }, [message]);
  useEffect(() => {
    if (!opened) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [opened]);
  function open() {
    dialog.current?.showModal();
    setOpened(true);
  }
  useEffect(() => {
    if (window.location.hash === "#shortlist") open();
  }, []);
  function toggle(id: string) {
    if (ids.includes(id)) {
      setIds(ids.filter((value) => value !== id));
      setMessage("Model removed from saved homes.");
    } else if (ids.length >= 3) {
      setMessage(
        "Your shortlist has three models. Remove one to save another.",
      );
      open();
    } else {
      setIds([...ids, id]);
      setMessage("Model saved. Compare it with up to two more.");
    }
  }
  const saved = ids
    .map((id) => properties.find((p) => p.id === id)!)
    .filter(Boolean);
  return (
    <ShortlistContext.Provider value={{ ids, toggle, open }}>
      {children}
      {message && (
        <div className="shortlist-toast" role="status">
          <Check size={17} />
          {message}
        </div>
      )}
      {saved.length > 0 && (
        <button className="shortlist-tray" onClick={open}>
          <Columns3 size={18} />
          <span>
            Saved homes <b>{saved.length}</b>
          </span>
          <span className="tray-compare">
            Compare <ArrowUpRight size={16} />
          </span>
        </button>
      )}
      <dialog
        ref={dialog}
        className="compare-dialog"
        aria-labelledby="compare-title"
        onClose={() => setOpened(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <ShortlistContents
          saved={saved}
          onRemove={toggle}
          onClear={() => setIds([])}
          onClose={() => dialog.current?.close()}
        />
      </dialog>
    </ShortlistContext.Provider>
  );
}

export function SaveButton({
  property,
  compact = false,
}: {
  property: Property;
  compact?: boolean;
}) {
  const { ids, toggle } = useContext(ShortlistContext);
  const saved = ids.includes(property.id);
  const [pulse,setPulse] = useState(0);
  return (
    <button
      type="button"
      className={`save-model ${saved ? "is-saved" : ""} ${compact ? "compact" : ""}`}
      aria-pressed={saved}
      aria-label={`${saved ? "Remove" : "Save"} ${property.title}${saved ? " from saved homes" : " model"}`}
      onClick={() => { if(saved || ids.length < 3)setPulse(value=>value+1);toggle(property.id); }}
    >
      <span key={pulse} className={`bookmark-glyph ${pulse ? "was-toggled" : ""}`} aria-hidden="true">{saved ? <Check size={17} /> : <Bookmark size={17} />}</span>
      <span>{saved ? "Saved" : "Save model"}</span>
    </button>
  );
}
export function ShortlistButton({ className = "" }: { className?: string }) {
  const { ids, open } = useContext(ShortlistContext);
  return (
    <button
      className={`nav-shortlist ${className}`}
      onClick={open}
      aria-label={`Saved homes, ${ids.length} ${ids.length === 1 ? "model" : "models"}`}
    >
      <Bookmark size={17} />
      <span>Saved</span>
      <b>{ids.length}</b>
    </button>
  );
}
