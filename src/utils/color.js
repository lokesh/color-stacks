import chroma from "chroma-js";
import bezier from "bezier-easing";

/* Contrast */
export const getContrastRatio = function(foreground, background) {
  return chroma.contrast(foreground, background);
};

/* Validation */
export const validateHex = (hex) => chroma.valid(hex);

/* Conversion */
export const hclToHex = (hcl) => chroma.hcl(hcl.h, hcl.c, hcl.l).hex();
export const hexToHCL = (hex) => chroma(hex).hcl();

/* Curves */
export const CURVE_LINEAR = "linear";
export const CURVE_EASE = "easeInOut";

export const curves = Object.freeze({
  linear: bezier(0.5, 0.5, 0.5, 0.5),
  easeInOut: bezier(0.445, 0.05, 0.55, 0.95)
});
