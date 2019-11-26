<template>
  <div ref="handle" class="handle" v-dragged="onDragged" :style="styles">
    <div v-if="false" class="val">{{ value }}</div>
  </div>
</template>

<script>
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
      isDragging: false,
      width: 16,
      left: 0
    };
  },

  computed: {
    xMin() {
      return this.spectrum.left;
    },
    xMax() {
      return this.spectrum.right;
    },
    styles() {
      return {
        width: `${this.width}px`,
        transform: `translateX(${this.left}px)`,
        cursor: this.isDragging ? "none" : "grab",
        zIndex: this.isDragging ? "10" : "auto"
      };
    }
  },

  watch: {
    left(val, oldVal) {
      let xPosOnSpectrum = val + this.width / 2;
      let percent = xPosOnSpectrum / this.spectrum.width;
      this.$emit("input", Math.floor(percent * this.max));
    }
  },

  created() {
    // Set initial position. Wait for spectrum to be mounted so we can measure
    // width.
    this.$nextTick(() => {
      this.left =
        Math.floor((this.value / this.max) * this.spectrum.width) -
        this.width / 2;
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

      //

      // var l = +window.getComputedStyle(el)["left"].slice(0, -2) || 0;
      // var t = +window.getComputedStyle(el)["top"].slice(0, -2) || 0;

      let clientXconstrained = Math.max(
        this.xMin,
        Math.min(clientX, this.xMax)
      );

      this.left = clientXconstrained - this.xMin - this.width / 2;
    }
  }
};
</script>

<style scoped>
.handle {
  position: absolute;
  height: calc(var(--spectrum-height) + var(--spectrum-handle-overhang) * 2);
  background: white;
  border: var(--border);
  border-radius: var(--radius-sm);
}

.val {
  position: absolute;
  top: 20px;
  width: 24px;
  height: 24px;
  background: white;
  border: 2px solid black;
}
</style>
