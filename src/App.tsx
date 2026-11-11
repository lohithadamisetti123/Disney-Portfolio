import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLenis } from "./components/useLenis";
import { SceneView } from "./components/Scenes";
import { FRAMES, scenes } from "./data/film";

// ---- Dwell: the film slows down while content is fully on screen, so there's time to read ----
const DWELL = 3.2; // how much longer the camera lingers on each scene
const RAMP = 0.016;
const windows = scenes
  .filter((s) => s.kind !== "opening" && s.kind !== "contact")
  .map((s) => [s.at[0] + RAMP, s.at[1] - RAMP] as [number, number]);
const cuts = Array.from(new Set([0, 1, ...windows.flat().map((v) => Math.min(1, Math.max(0, v)))])).sort((a, b) => a - b);
const segs = cuts.slice(0, -1).map((a, i) => {
  const b = cuts[i + 1];
  const mid = (a + b) / 2;
  const w = windows.some(([x, y]) => mid > x && mid < y) ? DWELL : 1;
  return { a, b, w, len: (b - a) * w };
});
const TOTAL = segs.reduce((t, g) => t + g.len, 0);
/** scroll position (0→1) → film position (0→1) */
function toFilm(u: number) {
  let t = Math.min(1, Math.max(0, u)) * TOTAL;
  for (const g of segs) {
    if (t <= g.len) return g.a + t / g.w;
    t -= g.len;
  }
  return 1;
}

export default function App() {
  useLenis(true);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pos = useRef(0);
  const { scrollYProgress: scrollRaw } = useScroll();
  const scrollYProgress = useTransform(scrollRaw, toFilm);

  const dim = useTransform(scrollYProgress, (v): number => {
    // softly dim the film behind whichever card is on screen, so content reads clearly
    const on = scenes.some((s) => s.kind !== "opening" && s.kind !== "hero" && s.kind !== "starring" && v > s.at[0] + 0.004 && v < (s.kind === "contact" ? 99 : s.at[1]) - 0.004);
    return on ? 1 : 0;
  });
  const endShade = useTransform(scrollYProgress, [0.92, 0.97], [0, 1]);
  const hint = useTransform(scrollYProgress, [0, 0.02], [1, 0]);

  // ---- Frame engine: compressed frames in memory, only frames near the viewer decoded ----
  const blobs = useRef<(Blob | undefined)[]>([]);
  const bmps = useRef(new Map<number, ImageBitmap>());
  const decoding = useRef(new Set<number>());
  const dir = useRef(1);
  const WIN = 22;
  const here = () => Math.round(pos.current * (FRAMES - 1));

  const draw = () => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const k = here();
    let img = bmps.current.get(k);
    if (!img) {
      for (let d = 1; d < FRAMES && !img; d++) img = bmps.current.get(k - d) || bmps.current.get(k + d);
    }
    if (!img) return; // keep whatever is on the canvas
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const s = Math.max(c.width / img.width, c.height / img.height);
    const w = img.width * s,
      h = img.height * s;
    ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
  };

  const ensureBitmaps = () => {
    const h0 = here();
    for (const [k, b] of bmps.current)
      if (Math.abs(k - h0) > WIN + 8) {
        b.close();
        bmps.current.delete(k);
      }
    for (let d = 0; d <= WIN && decoding.current.size < 4; d++) {
      for (const k of d === 0 ? [h0] : [h0 + d * dir.current, h0 - d * dir.current]) {
        if (k < 0 || k >= FRAMES || bmps.current.has(k) || decoding.current.has(k) || !blobs.current[k]) continue;
        decoding.current.add(k);
        createImageBitmap(blobs.current[k]!)
          .then((b) => {
            decoding.current.delete(k);
            if (Math.abs(k - here()) > WIN + 8) b.close();
            else {
              bmps.current.set(k, b);
              if (Math.abs(k - here()) <= 1) requestAnimationFrame(draw);
            }
            ensureBitmaps();
          })
          .catch(() => decoding.current.delete(k));
        if (decoding.current.size >= 4) break;
      }
    }
  };

  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const set = window.innerWidth * dpr > 1400 ? "hd" : "sd";
    const requested = new Array<boolean>(FRAMES).fill(false);
    const coarse: number[] = [];
    for (let k = 0; k < FRAMES; k += 8) coarse.push(k);
    coarse.push(FRAMES - 1);
    let alive = true;
    const pick = () => {
      const h0 = here();
      // frames right around the viewer always come first
      for (let d = 0; d < 30; d++)
        for (const k of [h0 + d * dir.current, h0 - d * dir.current]) if (k >= 0 && k < FRAMES && !requested[k]) return k;
      const c = coarse.find((k) => !requested[k]);
      if (c !== undefined) return c;
      for (let d = 30; d < FRAMES; d++)
        for (const k of [h0 + d * dir.current, h0 - d * dir.current]) if (k >= 0 && k < FRAMES && !requested[k]) return k;
      return -1;
    };
    const pump = () => {
      if (!alive) return;
      const k = pick();
      if (k < 0) return;
      requested[k] = true;
      fetch(`/film/${set}/f${String(k + 1).padStart(4, "0")}.webp`)
        .then((r) => r.blob())
        .then((b) => {
          blobs.current[k] = b;
          if (Math.abs(k - here()) <= WIN) ensureBitmaps();
        })
        .catch(() => (requested[k] = false))
        .finally(pump);
    };
    for (let n = 0; n < 6; n++) pump();
    return () => {
      alive = false;
      bmps.current.forEach((b) => b.close());
      bmps.current.clear();
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      const c = canvas.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(window.innerWidth * dpr);
      c.height = Math.round(window.innerHeight * dpr);
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const nv = Math.min(1, Math.max(0, v));
    if (nv !== pos.current) dir.current = nv > pos.current ? 1 : -1;
    pos.current = nv;
    ensureBitmaps();
    requestAnimationFrame(draw);
  });

  return (
    <>
      <div className="film" aria-hidden>
        <canvas ref={canvas} className="film-canvas" />
        <div className="film-vignette" />
        <motion.div className="film-dim" style={{ opacity: dim }} />
        <motion.div className="film-end" style={{ opacity: endShade }} />
      </div>

      <div className="stage">
        {scenes.map((s, i) => (
          <SceneView key={i} s={s} p={scrollYProgress} />
        ))}
      </div>

      <motion.div className="film-hint" style={{ opacity: hint }} aria-hidden>
        <i />
      </motion.div>
      <div className="film-progress" aria-hidden>
        <motion.i style={{ scaleX: scrollRaw }} />
      </div>

      <main className="film-track" aria-label="Lohitha Damisetti — portfolio film" />
    </>
  );
}
