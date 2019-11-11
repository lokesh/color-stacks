<template>
  <div
    class="swatch"
    :class="{
      'not-compliant': !aaCompliant
    }"
    :style="`
      background: ${hex};
      color: ${fontColor}
    `"
  >
    <div class="swatch-label">
      <div class="swatch-name">{{ name }}</div>
      <div class="swatch-hex">{{ backgroundColor }}</div>
      <div class="swatch-wcag" v-if="!aaCompliant">WCAG {{ Math.round(wcag * 100) / 100 }}</div>
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
    l: { type: Number, required: true },
    hex: { type: String, required: true },
    name: { type: String, required: true },
    
  },
  data() {
    return {
      chromaVal: null,
      clipped: false
    };
  },
  computed: {
    fontColor() {
      return this.l < 50 ? "#ffffff" : "#000000";
    },
    wcag() {
      return chroma.contrast(this.fontColor, this.backgroundColor);
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
  height: 4.5em;
  margin-bottom: var(--swatch-gap);
  padding: 8px;
  font-size: 11px;
}

.swatch-name {
  font-weight: 600;
}

.not-compliant::after {
  position: absolute;
  content: "AA";
  right: 8px;
  top: calc(50% - 5px);
  opacity: 0.85;
  padding: 0 2px;
  color: black;
  background: #fff;
  border-radius: 2px;
  text-decoration: line-through;
}
</style>
