import { motion, MotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";
import { portfolio } from "../data/portfolio";
import type { Scene } from "../data/film";

const RAMP = 0.016;

/** Whole-scene envelope: drifts in out of focus, settles, then floats past the camera. */
function useEnvelope(p: MotionValue<number>, a: number, b: number, hold = false, travel = 50) {
  const end = hold ? 99 : b;
  const opacity = useTransform(p, [a, a + RAMP, end - RAMP, end], [0, 1, 1, 0]);
  const blurV = useTransform(p, [a, a + RAMP * 1.3, end - RAMP, end], [16, 0, 0, 18]);
  const filter = useTransform(blurV, (v) => `blur(${v}px)`);
  const y = useTransform(p, [a, hold ? a + 0.05 : end], [travel, hold ? 0 : -travel]);
  const scale = useTransform(p, [a, a + RAMP * 1.5, end - RAMP, end], [0.97, 1, 1, 1.05]);
  const pointerEvents = useTransform(p, (v) => (v > a + RAMP * 0.6 && v < end - RAMP * 0.6 ? "auto" : "none"));
  return { opacity, filter, y, scale, pointerEvents };
}

/** A line inside a scene that arrives a beat after the one before it. */
function Beat({ p, a, i, children, className, as = "div" }: { p: MotionValue<number>; a: number; i: number; children: ReactNode; className?: string; as?: "div" | "p" | "h2" | "h3" }) {
  const s = a + 0.005 + i * 0.0028;
  const opacity = useTransform(p, [s, s + 0.012], [0, 1]);
  const y = useTransform(p, [s, s + 0.014], [18, 0]);
  const blurV = useTransform(p, [s, s + 0.012], [8, 0]);
  const filter = useTransform(blurV, (v) => `blur(${v}px)`);
  const M = motion[as];
  return (
    <M className={className} style={{ opacity, y, filter }}>
      {children}
    </M>
  );
}

/** Big chapter title, letters rising out of the light one by one. */
function Letters({ text, p, a, span = 0.016, className }: { text: string; p: MotionValue<number>; a: number; span?: number; className?: string }) {
  const chars = text.split("");
  return (
    <span className={className} aria-label={text}>
      {chars.map((c, i) => (
        <Letter key={i} c={c} p={p} s={a + (i / chars.length) * span} />
      ))}
    </span>
  );
}
function Letter({ c, p, s }: { c: string; p: MotionValue<number>; s: number }) {
  const opacity = useTransform(p, [s, s + 0.01], [0, 1]);
  const y = useTransform(p, [s, s + 0.014], ["0.5em", "0em"]);
  const blurV = useTransform(p, [s, s + 0.012], [14, 0]);
  const filter = useTransform(blurV, (v) => `blur(${v}px)`);
  return (
    <motion.span aria-hidden className="ltr" style={{ opacity, y, filter }}>
      {c === " " ? " " : c}
    </motion.span>
  );
}

const Gh = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Skill constellations: words drift through the sky at different depths */
type Word = { t: string; x: number; y: number; size: number; depth: number; label?: boolean };
const S = portfolio.skills;
const clusters: Word[][] = [
  // left side of the frame — Languages & Frontend
  [
    { t: "Languages", x: 6, y: 16, size: 1, depth: 0.6, label: true },
    { t: "C++", x: 8, y: 26, size: 1.5, depth: 1 },
    { t: "Java", x: 21, y: 24, size: 1.15, depth: 0.7 },
    { t: "Python", x: 13, y: 34, size: 1.35, depth: 1.2 },
    { t: "JavaScript", x: 25, y: 33, size: 1, depth: 0.8 },
    { t: "SQL", x: 6, y: 41, size: 0.95, depth: 0.5 },
    { t: "Frontend", x: 7, y: 56, size: 1, depth: 0.6, label: true },
    { t: "React.js", x: 9, y: 66, size: 1.55, depth: 1.1 },
    { t: "React Native", x: 22, y: 61, size: 1.05, depth: 0.7 },
    { t: "Tailwind CSS", x: 18, y: 75, size: 1.1, depth: 0.9 },
    { t: "HTML", x: 6, y: 80, size: 0.9, depth: 0.5 },
    { t: "CSS", x: 30, y: 71, size: 0.9, depth: 0.6 },
  ],
  // right side — Backend & Databases
  [
    { t: "Backend", x: 70, y: 15, size: 1, depth: 0.6, label: true },
    { t: "Node.js", x: 72, y: 25, size: 1.5, depth: 1.1 },
    { t: "Express.js", x: 84, y: 21, size: 1.05, depth: 0.7 },
    { t: "Spring Boot", x: 78, y: 33, size: 1.2, depth: 0.9 },
    { t: "REST APIs", x: 68, y: 38, size: 0.95, depth: 0.5 },
    { t: "Databases", x: 72, y: 56, size: 1, depth: 0.6, label: true },
    { t: "MongoDB", x: 70, y: 66, size: 1.4, depth: 1.1 },
    { t: "PostgreSQL", x: 82, y: 62, size: 1.2, depth: 0.8 },
    { t: "MySQL", x: 86, y: 73, size: 0.95, depth: 0.5 },
    { t: "MongoDB Atlas", x: 70, y: 77, size: 0.95, depth: 0.7 },
  ],
  // lower band — Tools & Core concepts
  [
    { t: "Tools & Craft", x: 8, y: 62, size: 1, depth: 0.6, label: true },
    { t: "Docker", x: 9, y: 71, size: 1.35, depth: 1.1 },
    { t: "Git", x: 22, y: 69, size: 1.1, depth: 0.8 },
    { t: "Redis", x: 16, y: 80, size: 1.05, depth: 0.7 },
    { t: "JWT", x: 30, y: 78, size: 0.9, depth: 0.5 },
    { t: "Postman", x: 28, y: 87, size: 0.9, depth: 0.6 },
    { t: "Electron.js", x: 7, y: 89, size: 0.95, depth: 0.7 },
    { t: "Core Concepts", x: 66, y: 62, size: 1, depth: 0.6, label: true },
    { t: "System Design", x: 66, y: 71, size: 1.35, depth: 1.1 },
    { t: "DSA", x: 85, y: 69, size: 1.2, depth: 0.9 },
    { t: "Machine Learning", x: 70, y: 80, size: 1.05, depth: 0.8 },
    { t: "AI", x: 90, y: 79, size: 1.3, depth: 1.2 },
    { t: "API Design", x: 64, y: 88, size: 0.9, depth: 0.5 },
    { t: "OOP", x: 81, y: 88, size: 0.9, depth: 0.6 },
  ],
];
void S;

const isPhone = typeof window !== "undefined" && window.innerWidth < 760;

function SkillWord({ w: w0, p, a, b, i, n }: { w: Word; p: MotionValue<number>; a: number; b: number; i: number; n: number }) {
  // On phones the sky is narrow: lay the words out as an airy zig-zag instead
  const w = isPhone ? { ...w0, x: w0.label ? 6 : i % 2 ? 58 : 10, y: 12 + (i * 74) / Math.max(1, n - 1), size: w0.label ? w0.size : Math.min(w0.size, 1.2) } : w0;
  const s = a + 0.004 + (i % 7) * 0.003;
  const opacity = useTransform(p, [s, s + 0.012, b - 0.012, b], [0, w.label ? 1 : 0.95, w.label ? 1 : 0.95, 0]);
  const y = useTransform(p, [a, b], [60 * w.depth, -90 * w.depth]);
  const blurV = useTransform(p, [s, s + 0.012, b - 0.012, b], [10, w.depth < 0.6 ? 0.6 : 0, 0, 10]);
  const filter = useTransform(blurV, (v) => `blur(${v}px)`);
  return (
    <motion.span
      className={`sk ${w.label ? "sk-label" : ""}`}
      style={{ left: `${w.x}%`, top: `${w.y}%`, translate: `-${w.x}% 0`, opacity, y, filter, fontSize: `calc(${w.size} * var(--sk))` }}
    >
      {w.label ? (
        <>
          <i /> {w.t}
        </>
      ) : (
        w.t
      )}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
export function SceneView({ s, p }: { s: Scene; p: MotionValue<number> }) {
  const [a, b] = s.at;
  const hold = s.kind === "contact";
  const env = useEnvelope(p, a, b, hold, s.kind === "heading" ? 30 : 50);
  const P = portfolio;

  switch (s.kind) {
    case "opening":
      return (
        <motion.div className="sc sc-center halo" style={env}>
          <p className="t-eyebrow">A Damisetti Shamya Lohitha film</p>
          <p className="t-meta">Scroll to begin</p>
        </motion.div>
      );

    case "hero":
      return (
        <motion.div className="sc sc-lower halo" style={env}>
          <Beat p={p} a={a - 0.006} i={0} as="p" className="t-eyebrow">The Kingdom of</Beat>
          <h1 className="h-hero">
            <Letters text={P.shortName} p={p} a={a} span={0.018} />
          </h1>
        </motion.div>
      );

    case "heading":
      return (
        <motion.div className={`sc sc-${s.pos} halo-soft`} style={env}>
          <Beat p={p} a={a - 0.006} i={0} as="p" className="h-eyebrow">✦ {s.eyebrow} ✦</Beat>
          <h2 className="h-chapter">
            <Letters text={s.text} p={p} a={a} />
          </h2>
          <Beat p={p} a={a} i={3} className="h-line"><i /></Beat>
        </motion.div>
      );

    case "about":
      return (
        <motion.div className="sc sc-lm halo comp" style={env}>
          <Beat p={p} a={a - 0.006} i={0} as="p" className="h-eyebrow">✦ Chapter I ✦</Beat>
          <h2 className="h-section">
            <Letters text="About Me" p={p} a={a} span={0.012} />
          </h2>
          <Beat p={p} a={a} i={3} as="p" className="comp-lead">
            Full Stack Developer crafting scalable apps with <b>React</b>, <b>Node.js</b> &amp; <b>AI</b> — strong in API development, system design and problem solving.
          </Beat>
          <Beat p={p} a={a} i={5} className="comp-stats">
            <div><b>9.07</b><span>CGPA</span></div>
            <em />
            <div><b>1,230+</b><span>Problems solved</span></div>
            <em />
            <div><b>3</b><span>AI products</span></div>
          </Beat>
        </motion.div>
      );

    case "starring":
      return (
        <motion.div className="sc sc-tl halo" style={env}>
          <p className="t-eyebrow">Starring</p>
          <p className="t-title">{P.name}</p>
        </motion.div>
      );

    case "education":
      return (
        <motion.div className="sc sc-rm halo comp right" style={env}>
          <Beat p={p} a={a - 0.006} i={0} as="p" className="h-eyebrow">✦ The Royal Academy ✦</Beat>
          <h2 className="h-section">
            <Letters text="Education" p={p} a={a} span={0.012} />
          </h2>
          <Beat p={p} a={a} i={3} className="edu-line">
            <span className="edu-year">2023 — 2027</span>
            <p className="edu-title">B.Tech in Data Science</p>
            <p className="edu-place">Aditya College of Engineering and Technology</p>
            <span className="pill-glass">CGPA 9.07</span>
          </Beat>
          <Beat p={p} a={a} i={6} className="edu-line">
            <span className="edu-year">2021 — 2023</span>
            <p className="edu-title">Intermediate (MPC)</p>
            <p className="edu-place">Sri Chaitanya Junior College, Kakinada</p>
            <span className="pill-glass">90.60%</span>
          </Beat>
          <Beat p={p} a={a} i={9} as="p" className="edu-honour">✦ Department Topper — Data Science ✦</Beat>
        </motion.div>
      );

    case "skills":
      return (
        <div className="sc-field">
          {clusters[s.cluster].map((w, i) => (
            <SkillWord key={w.t} w={w} p={p} a={a} b={b} i={i} n={clusters[s.cluster].length} />
          ))}
        </div>
      );

    case "project": {
      const pr = P.projects[s.index];
      return (
        <motion.div className={`sc sc-${s.pos}`} style={env}>
          <Glass p={p} a={a} b={b} wide={s.pos !== "rm"}>
            <Beat p={p} a={a} i={0} as="p" className="g-num">{pr.numeral}</Beat>
            <div className="g-main">
              <Beat p={p} a={a} i={1} as="p" className="g-kicker">{pr.kicker}</Beat>
              <Beat p={p} a={a} i={2} as="h3" className="g-title">{pr.title}</Beat>
              <Beat p={p} a={a} i={3} as="p" className="g-body">{pr.summary}</Beat>
              <Beat p={p} a={a} i={4} className="g-tech">
                {pr.tech.slice(0, 8).join("  ·  ")}
              </Beat>
              <Beat p={p} a={a} i={5}>
                <a className="g-link" href={pr.url} target="_blank" rel="noreferrer">
                  <Gh /> View on GitHub <span aria-hidden>→</span>
                </a>
              </Beat>
            </div>
          </Glass>
        </motion.div>
      );
    }

    case "achievements":
      return (
        <motion.div className="sc sc-tl-wide halo comp" style={env}>
          <Beat p={p} a={a - 0.006} i={0} as="p" className="h-eyebrow">✦ Chapter IV ✦</Beat>
          <h2 className="h-section">
            <Letters text="Achievements" p={p} a={a} span={0.014} />
          </h2>
          <Beat p={p} a={a} i={3} className="ach-big">
            <b>1,230+</b>
            <span>problems solved</span>
          </Beat>
          <Beat p={p} a={a} i={5} as="p" className="ach-meta">LeetCode 450+ &nbsp;✦&nbsp; CodeChef 500+ &nbsp;✦&nbsp; GFG 280+ &nbsp;✦&nbsp; 20+ HackerRank stars</Beat>
          <Beat p={p} a={a} i={7} as="p" className="ach-line"><span>Top 100 Team</span> Myntra WeForShe Hackerramp 2026</Beat>
          <Beat p={p} a={a} i={8} as="p" className="ach-line"><span>Department Topper</span> Data Science Department</Beat>
        </motion.div>
      );

    case "experience":
      return (
        <motion.div className="sc sc-rm halo comp right" style={env}>
          <Beat p={p} a={a - 0.006} i={0} as="p" className="h-eyebrow">✦ Chapter V ✦</Beat>
          <h2 className="h-section">
            <Letters text="Experience" p={p} a={a} span={0.012} />
          </h2>
          <Beat p={p} a={a} i={3} className="edu-line">
            <span className="edu-year">May — June 2026</span>
            <p className="edu-title">Full Stack Development Intern</p>
            <p className="edu-place">Technical Hub Pvt Ltd · web &amp; mobile apps with React Native</p>
          </Beat>
          <Beat p={p} a={a} i={6} as="p" className="cert-head">Certified by</Beat>
          <Beat p={p} a={a} i={7} as="p" className="cert-roll">
            {P.certifications.map((c) => c.name).join("  ✦  ")}
          </Beat>
        </motion.div>
      );

    case "contact":
      return (
        <motion.div className="sc sc-center halo-strong" style={env}>
          <Beat p={p} a={a - 0.006} i={0} as="p" className="h-eyebrow">✦ Epilogue ✦</Beat>
          <h2 className="h-chapter">
            <Letters text="Contact Me" p={p} a={a} />
          </h2>
          <Beat p={p} a={a} i={4} as="p" className="ct-lead">The next chapter begins with you — open to internships, full-time roles &amp; ambitious collaborations.</Beat>
          <Beat p={p} a={a} i={6}>
            <a className="ct-mail" href={`mailto:${P.contact.email}`}>{P.contact.email}</a>
          </Beat>
          <Beat p={p} a={a} i={8} className="ct-links">
            <a className="pill-glass link" href={P.contact.github} target="_blank" rel="noreferrer"><Gh /> GitHub</a>
            <a className="pill-glass link" href={P.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="pill-glass link" href="/Lohitha-Damisetti-Resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
          </Beat>
          <Beat p={p} a={a} i={10} as="p" className="ct-credit">© 2026 {P.name} · Visuals created with AI (Google Gemini)</Beat>
        </motion.div>
      );
  }
}

/** Premium frosted glass: almost invisible edges, a specular sheen that slides as the camera moves. */
function Glass({ p, a, b, wide, children }: { p: MotionValue<number>; a: number; b: number; wide?: boolean; children: ReactNode }) {
  const sheen = useTransform(p, [a, b], ["-60%", "160%"]);
  const tilt = useTransform(p, [a, b], [4, -4]);
  return (
    <motion.div className={`glass ${wide ? "wide" : ""}`} style={{ rotateY: tilt }}>
      <motion.span className="glass-sheen" style={{ x: sheen }} />
      <span className="glass-edge" />
      {children}
    </motion.div>
  );
}
