import chroma from "chroma-js";

export const getContrastRatio = function(foreground, background) {
  return chroma.contrast(foreground, background);
};

export const hclToHex = function(hcl) {
  let color = chroma.hcl(hcl.h, hcl.c, hcl.l);
  return color.hex();
};
