<template>
  <div class="curve-toggle">
    <label class="label curve-toggle__label">{{ label }}</label>
    <button class="curve-toggle__button button--muted" @click="toggle">
      <svg
        v-if="value === CURVE_LINEAR"
        class="curve-toggle__icon"
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.5 13.5L17.5 2.5" stroke="currentColor" stroke-width="2" />
        <circle cx="17.5" cy="2.5" r="2" />
        <circle cx="2.5" cy="13.5" r="2" />
      </svg>
      <svg
        v-if="value === CURVE_EASE"
        class="curve-toggle__icon"
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 13.5C12 13.4999 7.5 2.49997 17.5 2.5"
          stroke="currentColor"
          stroke-width="2"
        />
        <circle cx="17.5" cy="2.5" r="2" />
        <circle cx="2.5" cy="13.5" r="2" />
      </svg>

      <svg
        v-if="false"
        class="curve-toggle__icon"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 13L13 1" stroke="currentColor" stroke-width="2" />
      </svg>

      <svg
        v-if="false"
        class="curve-toggle__icon"
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 13C9.26923 13 3.73077 1 12.5 1"
          stroke="black"
          stroke-width="2"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { CURVE_EASE, CURVE_LINEAR } from "../utils/color.js";

export default {
  name: "CurveToggle",

  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      CURVE_LINEAR,
      CURVE_EASE
    };
  },

  methods: {
    toggle() {
      if (this.value === this.CURVE_LINEAR) {
        this.$emit("input", this.CURVE_EASE);
      } else {
        this.$emit("input", this.CURVE_LINEAR);
      }
    }
  }
};
</script>

<style scoped>
.curve-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.curve-toggle__label {
  text-transform: none;
}

.curve-toggle__button {
  width: 36px;
  height: 21px;
  padding: 0;

  &:hover .curve-toggle__icon {
    & path {
      stroke: var(--gray-65);
    }

    & circle {
      fill: var(--gray-5);
      stroke: var(--gray-65);
    }
  }
}

.curve-toggle__icon {
  position: relative;
  top: 1px;

  & path {
    stroke: var(--gray-20);
  }

  & circle {
    fill: var(--gray-5);
    stroke: var(--gray-20);
  }
}
</style>
