<template>
  <div
    class="swatch"
    :class="{
      'not-compliant': !aaCompliant
    }"
    :style="
      `
      background: ${backgroundColor};
      color: ${textColor}
    `
    "
  >
    <div class="swatch-label">
      <div class="swatch-name">{{ name }}</div>
      <div class="swatch-hex">{{ backgroundColor }}</div>
      <div class="swatch-wcag" v-if="!aaCompliant">
        WCAG {{ Math.round(wcag * 100) / 100 }}
      </div>
    </div>
  </div>
</template>

<script>
import chroma from "chroma-js";

import { generateColorLabel } from "../utils.js";

export default {
  name: "swatch",
  props: {
    h: {
      type: Number,
      required: true
    },
    c: {
      type: Number,
      required: true
    },
    l: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      chromaVal: null,
      clipped: false
    };
  },
  computed: {
    textColor() {
      return this.l < 50 ? "#ffffff" : "#000000";
    },
    backgroundColor() {
      let c = chroma.hcl(this.h, this.c, this.l);
      // this.superClipped = c._rgb._unclipped.some(
      //   val => val > 500 || val < -500
      // );
      // this.clipped = c.clipped();
      return c.hex();
    },
    name() {
      return generateColorLabel({
        label: this.label,
        hex: this.backgroundColor,
        h: this.h,
        c: this.c,
        l: this.l
      });
    },
    wcag() {
      return chroma.contrast(this.textColor, this.backgroundColor);
    },
    aaCompliant() {
      return this.wcag >= 4.51;
    }
  }
};
</script>

<style scoped>
.swatch {
  position: relative;
  width: 10em;
  height: 4em;
  margin-bottom: var(--swatch-gap);
  padding: 8px;
  font-size: 11px;
}

.swatch-name {
  /*  display: none;*/
  font-weight: 600;
  opacity: 0.8;
}

.swatch-hex {
  display: none;
  opacity: 0.8;
}

.swatch-wcag {
  display: none;
  opacity: 0.8;
}

.not-compliant::after {
  display: none;
  position: absolute;
  content: "AA";
  right: 8px;
  bottom: 8px;
  opacity: 0.85;
  padding: 0 2px;
  color: var(--color-secondary);
  font-weight: 600;
  background: #fff;
  border-radius: var(--radius-sm);
  /*  text-decoration: line-through;*/
}
</style>
