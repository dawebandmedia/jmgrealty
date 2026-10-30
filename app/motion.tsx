"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ImgHTMLAttributes, type RefObject } from "react";

const preferenceKey="jmg-reduce-motion-v1";
let manualReduced=false;
const subscribers=new Set<()=>void>();
const subscribe=(callback:()=>void)=>{subscribers.add(callback);return()=>{subscribers.delete(callback);};};
const getPreference=()=>manualReduced;
const serverPreference=()=>false;
function setPreference(reduced:boolean){
  manualReduced=reduced;
  document.documentElement.dataset.jmgMotion=reduced?"reduced":"auto";
  subscribers.forEach(callback=>callback());
}

export function motionAllowed() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && !document.hidden && !manualReduced && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function animateSafely(element: Element | null, frames: Keyframe[], options: KeyframeAnimationOptions) {
  if (!element || !motionAllowed() || typeof element.animate !== "function") return null;
  try { return element.animate(frames, { duration: 180, easing: "cubic-bezier(.2,.7,.3,1)", ...options }); }
  catch { return null; } // Unsupported animation features must never block an action.
}

function listen(query: MediaQueryList, callback: () => void) {
  if (typeof query.addEventListener === "function") { query.addEventListener("change", callback); return () => query.removeEventListener("change", callback); }
  query.addListener(callback); return () => query.removeListener(callback);
}

export function useMotionPreference() {
  const reduced=useSyncExternalStore(subscribe,getPreference,serverPreference);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!query.matches && !document.hidden);
    const cleanup = listen(query, update);update();document.addEventListener("visibilitychange", update);
    return () => { cleanup();document.removeEventListener("visibilitychange", update); };
  }, []);
  return enabled && !reduced;
}

export function MotionControls(){
  const reduced=useSyncExternalStore(subscribe,getPreference,serverPreference);
  const [deviceReduced,setDeviceReduced]=useState(false);
  useEffect(()=>{
    try{setPreference(localStorage.getItem(preferenceKey)==="true");}catch{}
    const storage=(event:StorageEvent)=>{if(event.key===preferenceKey)setPreference(event.newValue==="true");};
    window.addEventListener("storage",storage);
    const query=typeof window.matchMedia==="function"?window.matchMedia("(prefers-reduced-motion: reduce)"):null;
    const update=()=>setDeviceReduced(!!query?.matches);update();
    const cleanup=query?listen(query,update):()=>{};
    return()=>{cleanup();window.removeEventListener("storage",storage);};
  },[]);
  return <button className="motion-preference-control" type="button" aria-pressed={deviceReduced||reduced} disabled={deviceReduced} onClick={()=>{
    const next=!reduced;setPreference(next);try{localStorage.setItem(preferenceKey,String(next));}catch{}
  }}>{deviceReduced?"Reduced motion · device setting":reduced?"Motion: reduced":"Reduce motion"}</button>;
}

// No delayed filtering or animated layout: results and focus update immediately.
export function useContentMotion(ref: RefObject<HTMLElement | null>, signature: string) {
  const first = useRef(true);
  const enabled = useMotionPreference();
  useEffect(() => {
    if (first.current) {first.current = false;return;}
    if (!enabled) return;
    const animation = animateSafely(ref.current, [{opacity:.94},{opacity:1}], {duration:160});
    return () => animation?.cancel();
  }, [signature,ref,enabled]);
}

export function SelectionMarker({ selected }: { selected: string | number }) {
  const marker = useRef<HTMLSpanElement>(null), previous = useRef<string | null>(null);
  const enabled = useMotionPreference();
  useLayoutEffect(() => {
    const element = marker.current, group = element?.parentElement;
    if (!element || !group) return;
    let animation: Animation | null = null;
    const position = () => {
      const active = group.querySelector<HTMLElement>('button[aria-pressed="true"]');
      if (!active) {element.style.opacity="0";return;}
      const host = group.getBoundingClientRect(), box = active.getBoundingClientRect();
      const x = box.left-host.left+(box.width-40)/2, y = box.bottom-host.top-5;
      const next = `translate(${x}px,${y}px)`;
      element.style.transform=next;element.style.opacity="1";
      animation?.cancel();
      if (previous.current && previous.current!==next && enabled) animation=animateSafely(element,[{transform:previous.current},{transform:next}],{duration:260,easing:"cubic-bezier(.22,1.25,.4,1)"});
      previous.current=next;
    };
    position();
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(position) : null;
    observer?.observe(group);window.addEventListener("resize",position,{passive:true});
    return () => {animation?.cancel();observer?.disconnect();window.removeEventListener("resize",position);};
  },[selected,enabled]);
  return <span ref={marker} className="motion-selection-marker" aria-hidden="true"/>;
}

export function MotionImage({ src, alt, onLoad, ...props }: ImgHTMLAttributes<HTMLImageElement> & {src:string;alt:string}) {
  const shown = useRef(src), sequence = useRef(0);
  const [previous,setPrevious] = useState<{src:string;key:number}|null>(null);
  const enabled=useMotionPreference();
  useEffect(()=>{if(!enabled)setPrevious(null);},[enabled]);
  return <span className="motion-image-stack"><img {...props} src={src} alt={alt} onLoad={event=>{
    if(shown.current!==src){setPrevious(enabled ? {src:shown.current,key:++sequence.current}:null);shown.current=src;}
    onLoad?.(event);
  }}/>{previous && <img key={previous.key} className="motion-image-outgoing" src={previous.src} alt="" aria-hidden="true" decoding="async" onAnimationEnd={()=>setPrevious(current=>current?.key===previous.key?null:current)}/>}</span>;
}

export function ArchitecturalLine() {
  return <svg className="motion-architecture" width="168" height="42" viewBox="0 0 168 42" fill="none" aria-hidden="true" focusable="false"><path pathLength="1" d="M2 37H18V23L35 9L52 23V37H64V14H80V37H92V3H112V37H124V18H143V37H166M29 37V26H41V37M69 21H75M69 27H75M98 11H106M98 18H106M98 25H106M130 25H137M130 31H137" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function SoftSpotlight() {
  const light=useRef<HTMLSpanElement>(null),enabled=useMotionPreference();
  useEffect(()=>{
    const element=light.current,host=element?.parentElement;
    if(!element||!host||!enabled||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;
    let frame=0,inside=false,x=0,y=0,targetX=0,targetY=0;
    const stop=()=>{inside=false;cancelAnimationFrame(frame);frame=0;element.style.opacity="0";};
    const draw=()=>{
      frame=0;if(!inside||!motionAllowed())return stop();
      x+=(targetX-x)*.22;y+=(targetY-y)*.22;
      element.style.transform=`translate(${x-160}px,${y-160}px)`;
      if(Math.abs(targetX-x)+Math.abs(targetY-y)>.4)frame=requestAnimationFrame(draw);
    };
    const move=(event:PointerEvent)=>{
      if(event.pointerType!=="mouse")return;
      const box=host.getBoundingClientRect();targetX=event.clientX-box.left;targetY=event.clientY-box.top;
      if(!inside){inside=true;x=targetX;y=targetY;}element.style.opacity=".18";
      if(!frame)frame=requestAnimationFrame(draw);
    };
    host.addEventListener("pointermove",move,{passive:true});host.addEventListener("pointerleave",stop);document.addEventListener("visibilitychange",stop);
    return()=>{stop();host.removeEventListener("pointermove",move);host.removeEventListener("pointerleave",stop);document.removeEventListener("visibilitychange",stop);};
  },[enabled]);
  return <span ref={light} className="motion-spotlight" aria-hidden="true"/>;
}

export function SuccessMark() {
  // Only mount in a success branch after a real saved reference is received.
  return <span className="success-icon motion-success-check" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path pathLength="1" d="m6 14 5 5L22 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>;
}
