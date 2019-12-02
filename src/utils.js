import chroma from "chroma-js";

const getContrastRatio = function(foreground, background) {
  return chroma.contrast(foreground, background);
};

const hclToHex = function(hcl) {
  let color = chroma.hcl(hcl.h, hcl.c, hcl.l);
  // this.superClipped = c._rgb._unclipped.some(
  //   val => val > 500 || val < -500
  // );
  // this.clipped = c.clipped();
  return color.hex();
};

/**
 * @param
 * @property {string} [label]
 * @property {string} hex
 * @property {number} h
 * @property {number} c
 * @property {number} l
 */
const generateLabel = function(color) {
  let label;
  let addNumber = true;

  if (color.hex === "#ffffff") {
    label = "white";
    addNumber = false;
  } else if (color.hex === "#000000") {
    label = "black";
    addNumber = false;
  } else if (color.label) {
    label = color.label;
  } else if (color.c === 0) {
    label = "gray";
  } else if (color.h < 20) {
    label = "pink";
  } else if (color.h < 40) {
    label = "rose";
  } else if (color.h < 60) {
    label = "red";
  } else if (color.h < 80) {
    label = "orange";
  } else if (color.h < 100) {
    label = "brown";
  } else if (color.h < 120) {
    label = "olive";
  } else if (color.h < 140) {
    label = "forest";
  } else if (color.h < 160) {
    label = "green";
  } else if (color.h < 180) {
    label = "teal";
  } else if (color.h < 200) {
    label = "mint";
  } else if (color.h < 220) {
    label = "turqouise";
  } else if (color.h < 240) {
    label = "baby-blue";
  } else if (color.h < 260) {
    label = "powder-blue";
  } else if (color.h < 280) {
    label = "blue";
  } else if (color.h < 300) {
    label = "cobalt";
  } else if (color.h < 320) {
    label = "indigo";
  } else if (color.h < 340) {
    label = "purple";
  } else if (color.h <= 360) {
    label = "plum";
  }

  if (addNumber) {
    let number = Math.max(0, 100 - Math.ceil(((color.l / 100) * 100) / 5) * 5);
    label += `-${number}`;
  }

  return label;
};

export { getContrastRatio, generateLabel, hclToHex };
