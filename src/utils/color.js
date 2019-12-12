import chroma from "chroma-js";
import bezier from "bezier-easing";

/* Contrast */
export const getContrastRatio = function(foreground, background) {
  return chroma.contrast(foreground, background);
};

/* Conversion */
export const hclToHex = function(hcl) {
  let color = chroma.hcl(hcl.h, hcl.c, hcl.l);
  return color.hex();
};

/* Curves */
export const CURVE_LINEAR = "linear";
export const CURVE_EASE = "easeInOut";

export const curves = Object.freeze({
  linear: bezier(0.5, 0.5, 0.5, 0.5),
  easeInOut: bezier(0.445, 0.05, 0.55, 0.95)
});
