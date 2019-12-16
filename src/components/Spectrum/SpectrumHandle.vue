<template>
  <div class="spectrum-handle" :style="styles">
    <div
      ref="handle"
      class="handle"
      v-dragged="onDragged"
      :style="handleStyles"
    />
    <input
      v-if="!isMobile"
      type="number"
      class="handle-input"
      :min="hueMin"
      :max="hueMax"
      v-model.number="hueInput"
      @keydown.shift="onKeydownWithShift"
      @focus="$store.commit('highlightHue', index)"
      @blur="$store.commit('unhighlightHue')"
    />
    <button class="handle-remove button--muted" @click="remove">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        class="feather feather-x"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SpectrumHandle",

  inject: ["spectrum"],

  props: {
    index: {
      type: Number
    },
    value: {
      type: Number
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      isDragging: false,
      width: this.$store.state.hueSliderWidth
    };
  },

  computed: {
    ...mapState(["hueMin", "hueMax", "isMobile"]),

    hueInput: {
      get() {
        return this.value;
      },
      set(val) {
        if (val && Number.isInteger(val)) {
          this.$emit("input", val);
        }
      }
    },
    xMin() {
      return this.spectrum.left;
    },
    xMax() {
      return this.spectrum.right;
    },
    styles() {
      let left =
        Math.floor((this.value / this.max) * this.spectrum.width) -
        this.width / 2;
      return {
        transform: `translateX(${left}px)`,
        zIndex: this.isDragging ? "10" : "auto"
      };
    },
    handleStyles() {
      return {
        width: `${this.width}px`,
        borderColor: this.isDragging
          ? "var(--focus-color)"
          : "var(--control-border-color)",
        boxShadow: this.isDragging ? "0 0 0 1px var(--focus-color)" : "none",
        cursor: this.isDragging ? "none" : "grab"
      };
    }
  },

  methods: {
    /* eslint-disable no-unused-vars */
    onDragged({
      el,
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      clientX,
      clientY,
      first,
      last
    }) {
      /* eslint-enable no-unused-vars */

      if (first) {
        this.isDragging = true;
        this.$store.commit("highlightHue", this.index);
        return;
      }
      if (last) {
        this.isDragging = false;
        this.$store.commit("unhighlightHue");
        return;
      }

      let clientXconstrained = Math.max(
        this.xMin,
        Math.min(clientX, this.xMax)
      );

      let xPosOnSpectrum = clientXconstrained - this.xMin;
      let percent = xPosOnSpectrum / this.spectrum.width;
      this.$emit("input", Math.floor(percent * this.max));
    },
    onKeydownWithShift(event) {
      if (event.key === "ArrowUp") {
        this.hueInput += 10;
        event.preventDefault();
      } else if (event.key === "ArrowDown") {
        this.hueInput -= 10;
        event.preventDefault();
      }
    },
    remove() {
      this.$store.commit("removeHue", this.index);
    }
  }
};
</script>

<style scoped>
.spectrum-handle {
  --spectrum-handle-width: 16px;
  --spectrum-handle-input-width: 36px;
  position: absolute;
}

.handle {
  height: calc(var(--spectrum-height) + var(--spectrum-handle-overhang) * 2);
  background: white;
  border: var(--control-border);
  border-radius: var(--radius-sm);
  user-select: none;
}

.handle-input {
  position: absolute;
  top: calc((var(--control-height) + 8px) * -1);
  left: calc(
    var(--spectrum-handle-input-width) * -0.5 + var(--spectrum-handle-width) *
      0.5
  );
  width: var(--spectrum-handle-input-width);
  height: 24px;
  padding: 4px 6px;
}

.handle-remove {
  position: relative;
  top: 5px;
  left: -2px;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  color: var(--gray-20);
}

.handle-remove:hover {
  color: var(--gray-65);
}

.handle-remove:focus {
  box-shadow: none;
}

.feather {
  margin-top: -2px;
  width: var(--control-icon-size);
}
</style>
