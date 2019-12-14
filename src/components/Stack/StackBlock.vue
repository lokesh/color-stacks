<template>
  <div
    class="stack-block"
    :class="{
      'not-compliant': !aaCompliant
    }"
    :style="styles"
  >
    <div class="stack-block__label">{{ label }}</div>
    <div class="stack-block__hex">{{ hex }}</div>
    <div class="stack-block__contrast" v-if="!aaCompliant">
      WCAG {{ Math.round(contrastRatio * 100) / 100 }}
    </div>
  </div>
</template>

<script>
export default {
  name: "StackBlock",

  props: {
    hex: {
      type: String,
      required: true
    },
    h: {
      type: Number
    },
    c: {
      type: Number
    },
    l: {
      type: Number
    },
    label: {
      type: String,
      required: true
    },
    contrastRatio: {
      type: Number,
      required: true
    },
    isDark: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      clipped: false
    };
  },
  computed: {
    textColor() {
      return this.isDark ? "#ffffff" : "#000000";
    },
    aaCompliant() {
      return this.contrastRatio >= 4.51;
    },
    showBorder() {
      return this.l > 90 && this.c < 30;
    },
    styles() {
      return {
        background: this.hex,
        color: this.textColor,
        boxShadow: this.showBorder
          ? "inset 0 0 0 1px rgba(0, 0, 0, 0.05)"
          : "none"
      };
    }
  }
};
</script>

<style scoped>
.stack-block {
  position: relative;
  width: 10em;
  height: 4em;
  margin-bottom: var(--swatch-gap);
  padding: 8px;
  font-size: 11px;
}

.stack-block__label {
  font-weight: var(--bold);
  opacity: 0.8;
}

.stack-block__hex {
  display: none;
  opacity: 0.8;
}

.stack-block__contrast {
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
  font-weight: var(--bold);
  background: #fff;
  border-radius: var(--radius-sm);
  /*  text-decoration: line-through;*/
}
</style>
