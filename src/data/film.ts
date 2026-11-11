// Everything that appears over the film, in order.
// `at` = [start, end] as a fraction of the whole scroll (0 → 1).

export const FRAMES = 711;

export type Scene =
  | { kind: "opening"; at: [number, number] }
  | { kind: "hero"; at: [number, number] }
  | { kind: "heading"; at: [number, number]; eyebrow: string; text: string; pos: "center" | "left" | "right" }
  | { kind: "about"; at: [number, number] }
  | { kind: "starring"; at: [number, number] }
  | { kind: "education"; at: [number, number] }
  | { kind: "skills"; at: [number, number]; cluster: 0 | 1 | 2 }
  | { kind: "project"; at: [number, number]; index: 0 | 1 | 2; pos: "rm" | "tr" | "br" }
  | { kind: "achievements"; at: [number, number] }
  | { kind: "experience"; at: [number, number] }
  | { kind: "contact"; at: [number, number] };

export const scenes: Scene[] = [
  { kind: "opening", at: [-1, 0.035] },
  { kind: "hero", at: [0.04, 0.11] },
  { kind: "about", at: [0.115, 0.205] },
  { kind: "starring", at: [0.209, 0.266] },
  { kind: "education", at: [0.27, 0.395] },

  { kind: "heading", at: [0.397, 0.452], eyebrow: "Chapter II", text: "My Skills", pos: "center" },
  { kind: "skills", at: [0.448, 0.505], cluster: 0 },
  { kind: "skills", at: [0.495, 0.555], cluster: 1 },
  { kind: "skills", at: [0.545, 0.605], cluster: 2 },

  { kind: "heading", at: [0.6, 0.652], eyebrow: "Chapter III", text: "My Work", pos: "center" },
  { kind: "project", at: [0.648, 0.698], index: 0, pos: "rm" },
  { kind: "project", at: [0.698, 0.749], index: 1, pos: "tr" },
  { kind: "project", at: [0.748, 0.8], index: 2, pos: "br" },

  { kind: "achievements", at: [0.803, 0.858] },
  { kind: "experience", at: [0.862, 0.922] },
  { kind: "contact", at: [0.93, 99] },
];
