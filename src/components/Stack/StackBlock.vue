<template>
  <div
    class="stack-block"
    :class="{
      'not-compliant': showContrastRatio && !aaCompliant
    }"
    :style="styles"
  >
    <div class="stack-block__content">
      <div
        v-if="showLabel"
        class="stack-block__label"
        :class="{ 'stack-block__label--bold': showingLabelPlus }"
      >
        {{ label }}
      </div>
      <div v-if="showHex" class="stack-block__hex">{{ hex }}</div>
      <div v-if="showContrastRatio" class="stack-block__contrast">
        <span class="stack-block__contrast-icon">◑</span>
        {{ Math.round(contrastRatio * 100) / 100 }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
    ...mapState(["showLabel", "showHex", "showContrastRatio"]),
    aaCompliant() {
      return this.contrastRatio >= 4.51;
    },
    showingLabelPlus() {
      return this.showLabel && (this.showHex || this.showContrastRatio);
    },
    showBorder() {
      return this.l > 90 && this.c < 30;
    },
    textColor() {
      return this.isDark ? "#ffffff" : "#000000";
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
  margin-bottom: var(--swatch-gap);
  padding: 8px;
  font-size: 11px;
}

.stack-block__content {
  opacity: 0.8;
}

.stack-block__label--bold {
  font-weight: var(--weight-bold);
}

.stack-block__contrast-icon {
  line-height: 1;
}

.not-compliant::after {
  position: absolute;
  content: "Not AA";
  right: 8px;
  bottom: 8px;
  opacity: 0.85;
  padding: 0 4px 1px 4px;

  font-size: 10px;
  font-weight: var(--weight-bold);
  color: #fff;
  /*background: #fff;*/
  border: 1px solid #fff;
  border-radius: var(--radius);

  /*  text-decoration: line-through;*/
}
</style>
