<template>
  <div class="spectrum-handle" :style="styles">
    <div
      ref="handle"
      class="handle"
      v-dragged="onDragged"
      :style="handleStyles"
    />
    <input
      type="number"
      class="handle-input"
      :min="hueMin"
      :max="hueMax"
      v-model.number="hueInput"
      @keydown.shift="onKeydownWithShift"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SpectrumHandle",

  inject: ["spectrum"],

  props: {
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
      // hueInput: this.value,
      isDragging: false,
      width: this.$store.state.hueSliderWidth,
      left: 0
    };
  },

  computed: {
    ...mapState(["hueMin", "hueMax"]),

    hueInput: {
      get() {
        return this.value;
      },
      set(val) {
        console.log(val);
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
      return {
        transform: `translateX(${this.left}px)`,
        zIndex: this.isDragging ? "10" : "auto"
      };
    },
    handleStyles() {
      return {
        width: `${this.width}px`,
        cursor: this.isDragging ? "none" : "grab"
      };
    }
  },

  watch: {
    value(val) {
      this.updatePosition();
    }
  },

  created() {
    // Set initial position. Wait for spectrum to be mounted so we can measure
    // width.
    this.$nextTick(() => {
      this.updatePosition();
    });
  },

  methods: {
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
      if (first) {
        this.isDragging = true;
        return;
      }
      if (last) {
        this.isDragging = false;
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
        if (this.hueInput > this.hueMax) {
          this.hueInput = this.hueMax;
        }
        event.preventDefault();
      } else if (event.key === "ArrowDown") {
        this.hueInput -= 10;
        if (this.hueInput < this.hueMin) {
          this.hueInput = this.hueMin;
        }
        event.preventDefault();
      }
    },
    updatePosition() {
      this.left =
        Math.floor((this.value / this.max) * this.spectrum.width) -
        this.width / 2;
    }
  }
};
</script>

<style scoped>
.spectrum-handle {
  position: absolute;
}

.handle {
  height: calc(var(--spectrum-height) + var(--spectrum-handle-overhang) * 2);
  background: white;
  border: var(--border);
  border-radius: var(--radius-sm);
  /*box-shadow: inset 0 0 0 2px white, inset 0 0 0 3px #b3b3b3;*/
}

.handle-input {
  position: absolute;
  top: calc(var(--spectrum-height) + var(--spectrum-handle-overhang));
  left: -16px;
  width: 48px;
  height: 24px;
  background: white;
  border: var(--border);
}
</style>
