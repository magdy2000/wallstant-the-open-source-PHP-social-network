import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Cairo (SIL OFL) bundled locally in public/fonts so rendering works offline.
export const fontFamily = "Cairo";

const ranges = {
  arabic:
    "U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC",
  latin:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
};

for (const subset of ["arabic", "latin"] as const) {
  for (const weight of ["400", "700", "900"]) {
    loadFont({
      family: fontFamily,
      url: staticFile(`fonts/cairo-${subset}-${weight}-normal.woff2`),
      weight,
      unicodeRange: ranges[subset],
    });
  }
}

export const colors = {
  bg: "#0b0b0d",
  ink: "#ffffff",
  muted: "rgba(255,255,255,0.72)",
  accent: "#d9e021", // UIB label yellow
  red: "#e3262c", // Primer can red
};

export const FPS = 30;
export const TRANSITION = 15;

// Scene lengths in frames (30 fps)
export const SCENES = {
  intro: 100,
  closeUp: 100,
  system: 110,
  site: 150,
  finish: 110,
  outro: 140,
};

export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b, 0) -
  (Object.keys(SCENES).length - 1) * TRANSITION;
