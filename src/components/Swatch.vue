<template>
  <div
    class="swatch"
    :class="{
      'not-compliant': !aaCompliant
    }"
    :style="
      `
      background: ${backgroundColor};
      color: ${color}
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

export default {
  name: "swatch",
  props: {
    h: { type: Number, required: true },
    c: { type: Number, required: true },
    l: { type: Number, required: true }
  },
  data() {
    return {
      chromaVal: null,
      clipped: false
    };
  },
  computed: {
    color() {
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
      // 0 = red, 120 = green, blue = 240,
      let label;
      let addNumber = true;
      if (this.backgroundColor === "#ffffff") {
        label = "white";
        addNumber = false;
      } else if (this.backgroundColor === "#000000") {
        label = "black";
        addNumber = false;
      } else if (this.c === 0) {
        label = "gray";
      } else if (this.h < 20) {
        label = "pink";
      } else if (this.h < 40) {
        label = "rose";
      } else if (this.h < 60) {
        label = "red";
      } else if (this.h < 80) {
        label = "orange";
      } else if (this.h < 100) {
        label = "brown";
      } else if (this.h < 120) {
        label = "olive";
      } else if (this.h < 140) {
        label = "forest";
      } else if (this.h < 160) {
        label = "green";
      } else if (this.h < 180) {
        label = "teal";
      } else if (this.h < 200) {
        label = "mint";
      } else if (this.h < 220) {
        label = "turqouise";
      } else if (this.h < 240) {
        label = "baby-blue";
      } else if (this.h < 260) {
        label = "powder-blue";
      } else if (this.h < 280) {
        label = "blue";
      } else if (this.h < 300) {
        label = "cobalt";
      } else if (this.h < 320) {
        label = "indigo";
      } else if (this.h < 340) {
        label = "purple";
      } else if (this.h < 360) {
        label = "plum";
      }

      if (addNumber) {
        label += `-${100 - Math.ceil(((this.l / 150) * 100) / 5) * 5}`;
      }

      return label;
      // return this.backgroundColor;
    },
    wcag() {
      return chroma.contrast(this.color, this.backgroundColor);
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
  /*display: none;*/
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
