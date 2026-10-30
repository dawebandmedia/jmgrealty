"use client";

/*
 * Golden-hour hero. One WebGL fragment shader over the hero rendering:
 *  1. Blueprint: the photo's own edges (Sobel filter) drawn in gold on deep green,
 *     so the "plan" is literally this building, then a wipe builds it into the photo.
 *  2. Light: a slow sun shaft, floating dust (fireflies after dark) and a pointer light.
 *  3. Time of day: Day / Golden hour / Evening, defaulting to the clock in Manila.
 * The <img> underneath stays in the page for SEO, LCP and as the fallback; the canvas
 * only appears once its first frame is drawn, and never when motion is reduced.
 */

import { useEffect, useRef, useState } from "react";
import { useCinema } from "./cinema";

const VERT = `attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;

const FRAG = `precision highp float;
varying vec2 v;
uniform sampler2D T;
uniform vec2 R, I, M;
uniform float time, reveal, mode, presence, shift;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float luma(vec3 c){return dot(c,vec3(.299,.587,.114));}

vec2 cover(vec2 uv){
  float ra=R.x/R.y, ia=I.x/I.y; vec2 s=ra>ia?vec2(1.,ia/ra):vec2(ra/ia,1.);
  uv=(uv-.5)*s/1.08+.5;        // the CSS version is scaled 1.11; match it closely
  uv.y+=shift;                 // gentle scroll parallax
  return vec2(uv.x,1.-uv.y);
}

float edge(vec2 uv){
  vec2 t=2.6/I;
  float a=luma(texture2D(T,uv+vec2(-t.x,-t.y)).rgb),b=luma(texture2D(T,uv+vec2(0,-t.y)).rgb),c=luma(texture2D(T,uv+vec2(t.x,-t.y)).rgb);
  float d=luma(texture2D(T,uv+vec2(-t.x,0)).rgb),f=luma(texture2D(T,uv+vec2(t.x,0)).rgb);
  float g=luma(texture2D(T,uv+vec2(-t.x,t.y)).rgb),h=luma(texture2D(T,uv+vec2(0,t.y)).rgb),k=luma(texture2D(T,uv+vec2(t.x,t.y)).rgb);
  float gx=-a-2.*d-g+c+2.*f+k, gy=-a-2.*b-c+g+2.*h+k;
  return sqrt(gx*gx+gy*gy);
}

vec3 dust(vec2 uv, float night){
  vec3 acc=vec3(0.);
  for(int L=0;L<3;L++){
    float fl=float(L), sc=7.+fl*5.;
    vec2 q=uv*vec2(sc*R.x/R.y,sc)+vec2(time*(.05+fl*.03),-time*(.08+fl*.02));
    vec2 id=floor(q), f=fract(q)-.5;
    float h=hash(id+fl*17.);
    if(h>.82){
      vec2 o=vec2(hash(id+3.)-.5,hash(id+9.)-.5)*.6+.12*vec2(sin(time*.7+h*20.),cos(time*.5+h*11.));
      float d=length(f-o);
      float tw=night>.5? pow(.5+.5*sin(time*(1.5+h*3.)+h*40.),3.) : .55+.45*sin(time*2.+h*30.);
      acc+=smoothstep(.06-fl*.012,0.,d)*tw*(.35+fl*.2);
    }
  }
  return acc*mix(vec3(1.,.93,.75),vec3(1.,.78,.35),night);
}

void main(){
  vec2 uv=cover(v);
  vec3 photo=texture2D(T,uv).rgb;

  // ---------- blueprint: the building's own lines, in gold
  float e=smoothstep(.10,.42,edge(uv));
  vec2 px=v*R/ (R.y/22.);
  float grid=max(smoothstep(.96,1.,fract(px.x)),smoothstep(.96,1.,fract(px.y)))*.06;
  vec3 plan=mix(vec3(.063,.161,.122),vec3(.82,.70,.42),e)+grid*vec3(.72,.81,.66);

  // ---------- the wipe from plan to photograph
  float d=v.x*.78+(1.-v.y)*.32+(noise(v*7.+time*.15)-.5)*.10;
  float p=reveal*1.32-.12;
  float m=1.-smoothstep(p-.05,p,d);
  float seam=exp(-abs(d-p)*55.)*(1.-smoothstep(.96,1.,reveal))*step(.001,reveal);
  vec3 col=mix(plan,photo,m)+seam*vec3(1.,.82,.45)*1.35;

  // ---------- time of day: 0 day, 1 golden hour, 2 evening
  float golden=1.-abs(clamp(mode,0.,2.)-1.), night=clamp(mode-1.,0.,1.);
  float y=luma(photo);
  vec3 day=photo*1.03+vec3(.01,.008,0.);
  vec3 gold=photo*vec3(1.10,.97,.80)+vec3(.07,.035,0.)*(1.-y)+pow(y,3.)*vec3(.12,.07,0.);
  vec3 eve=photo*vec3(.34,.42,.62);
  float sky=smoothstep(.55,1.,v.y)*smoothstep(.55,.85,y);
  eve=mix(eve,vec3(.05,.08,.18)+vec3(.12,.10,.20)*(1.-v.y),sky*.85);
  float lamps=smoothstep(.62,.92,y)*(1.-sky)*smoothstep(.85,.2,v.y);
  eve+=lamps*vec3(1.,.66,.28)*.55;
  vec3 graded=mix(mix(day,gold,golden),eve,night);
  col=mix(col,graded,m);

  // ---------- light: a slow sun shaft and a pointer light
  float shaftPos=fract(time*.018)*1.8-.4;
  float shaft=exp(-pow((v.x+v.y*.45-shaftPos)*5.,2.))*(1.-night)*(.10+golden*.10);
  vec2 aspect=vec2(R.x/R.y,1.);
  float spot=exp(-dot((v-M)*aspect,(v-M)*aspect)*9.)*presence*(.16+night*.10);
  col+=m*(shaft*vec3(1.,.86,.6)+spot*mix(vec3(1.,.95,.8),vec3(1.,.75,.4),night));
  col+=m*dust(v,night)*(.30+night*.55);

  // ---------- finish: vignette and fine grain
  col*=mix(1.,smoothstep(1.25,.35,length((v-.5)*vec2(1.2,1.))),.35);
  col+=(hash(v*R+time)-.5)*.025;
  gl_FragColor=vec4(col,1.);
}`;

type Mode = 0 | 1 | 2;
const labels: Record<Mode, string> = { 0: "Day", 1: "Golden hour", 2: "Evening" };

function manilaMode(): Mode {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour")?.value || 12) % 24 + Number(parts.find((p) => p.type === "minute")?.value || 0) / 60;
  if (h >= 6 && h < 15.5) return 0;
  if (h >= 15.5 && h < 18.5) return 1;
  return 2;
}

export function GoldenHourCanvas({ src }: { src: string }) {
  const on = useCinema();
  const canvas = useRef<HTMLCanvasElement>(null);
  // The switch only renders after the shader's first frame, so server and client never disagree about it.
  const [mode, setMode] = useState<Mode | null>(() => (typeof window === "undefined" ? null : manilaMode()));
  const modeRef = useRef<number>(mode ?? 0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = canvas.current, frame = el?.parentElement;
    if (!on || !el || !frame) return;
    const gl = el.getContext("webgl", { antialias: false, premultipliedAlpha: false, powerPreference: "low-power" });
    if (!gl) return;
    const compile = (type: number, source: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, source); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (name: string) => gl.getUniformLocation(program, name);
    const U = { R: u("R"), I: u("I"), M: u("M"), time: u("time"), reveal: u("reveal"), mode: u("mode"), presence: u("presence"), shift: u("shift") };

    let raf = 0, alive = true, visible = true, loaded = false, revealStart = 0;
    let shownMode = modeRef.current, mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5, presence = 0, targetPresence = 0;
    const started = performance.now();
    const introDelay = document.documentElement.classList.contains("jmg-intro") ? 1500 : 250;

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (!alive) return;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform2f(U.I, image.naturalWidth, image.naturalHeight);
      loaded = true;
      revealStart = Math.max(performance.now(), started + introDelay);
      if (!raf) raf = requestAnimationFrame(draw);
    };
    image.onerror = () => { alive = false; };
    image.src = src;

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5), r = el.getBoundingClientRect();
      el.width = Math.max(1, Math.round(r.width * dpr)); el.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, el.width, el.height); gl.uniform2f(U.R, el.width, el.height);
    };
    size();
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(size) : null;
    ro?.observe(el);

    let first = true;
    const draw = (now: number) => {
      raf = 0;
      if (!alive || !loaded) return;
      const rv = Math.min(1, Math.max(0, (now - revealStart) / 2600));
      const eased = rv < 0.5 ? 4 * rv * rv * rv : 1 - Math.pow(-2 * rv + 2, 3) / 2;
      shownMode += (modeRef.current - shownMode) * 0.045;
      mx += (tx - mx) * 0.08; my += (ty - my) * 0.08; presence += (targetPresence - presence) * 0.06;
      const r = frame.getBoundingClientRect();
      gl.uniform1f(U.time, (now - started) / 1000);
      gl.uniform1f(U.reveal, eased);
      gl.uniform1f(U.mode, shownMode);
      gl.uniform2f(U.M, mx, my);
      gl.uniform1f(U.presence, presence);
      gl.uniform1f(U.shift, Math.max(-0.04, Math.min(0.04, -r.top / innerHeight * 0.04)));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (first) { first = false; frame.dataset.gl = "on"; setReady(true); }
      if (visible && !document.hidden) raf = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width; ty = 1 - (e.clientY - r.top) / r.height; targetPresence = 1;
    };
    const leave = () => { targetPresence = 0; };
    frame.addEventListener("pointermove", move, { passive: true });
    frame.addEventListener("pointerleave", leave);
    const io = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && loaded) raf = requestAnimationFrame(draw);
    }) : null;
    io?.observe(el);
    const wake = () => { if (!document.hidden && visible && !raf && loaded) raf = requestAnimationFrame(draw); };
    document.addEventListener("visibilitychange", wake);
    const lost = (e: Event) => { e.preventDefault(); alive = false; delete frame.dataset.gl; setReady(false); };
    el.addEventListener("webglcontextlost", lost);

    return () => {
      alive = false; cancelAnimationFrame(raf); ro?.disconnect(); io?.disconnect();
      frame.removeEventListener("pointermove", move); frame.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", wake); el.removeEventListener("webglcontextlost", lost);
      delete frame.dataset.gl; setReady(false);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [on, src]);

  const choose = (m: Mode) => { modeRef.current = m; setMode(m); };
  return <>
    <canvas ref={canvas} className="golden-canvas" aria-hidden="true" />
    {on && ready && mode !== null && <div className="golden-switch" role="group" aria-label="Light on the rendering">
      {([0, 1, 2] as Mode[]).map((m) => <button key={m} type="button" aria-pressed={mode === m} onClick={() => choose(m)}>{labels[m]}</button>)}
    </div>}
  </>;
}
