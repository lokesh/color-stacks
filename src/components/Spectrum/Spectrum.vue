<template>
  <div class="spectrum">
    <div
      class="spectrum-gradient"
      ref="spectrum"
      @click="onSpectrumClick"
    ></div>
    <div v-if="hues.length === 0" class="help">
      {{ helpLabel }}
    </div>
    <div class="hues">
      <template v-for="(hue, i) in hues">
        <spectrum-handle
          :key="`hue-${i}`"
          :index="i"
          :min="0"
          :max="360"
          :value="hue"
          @input="val => onHandleChange(i, val)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import throttle from "lodash.throttle";
import { mapState } from "vuex";
import SpectrumHandle from "./SpectrumHandle";

export default {
  name: "Spectrum",

  components: {
    SpectrumHandle
  },

  provide() {
    return {
      spectrum: this.dimensions
    };
  },

  data() {
    return {
      left: null,
      isDragging: false,
      dimensions: {
        left: 0,
        right: 0,
        width: 0
      }
    };
  },

  computed: {
    ...mapState(["isMobile"]),
    hues() {
      return this.$store.state.colorHues;
    },
    helpLabel() {
      return `${this.isMobile ? "Tap" : "Click"} to add colors ^`;
    }
  },

  mounted() {
    this.storeSpectrumDimensions();

    window.addEventListener("resize", this.storeSpectrumDimensions, {
      passive: true
    });
  },

  destroyed() {
    window.removeEventListener("resize", this.storeSpectrumDimensions);
  },

  methods: {
    addHue(hue) {
      this.$store.dispatch("addHue", hue);
    },
    getHueStyles(hue) {
      let x = (hue / 360) * this.dimensions.width;
      return {
        transform: `translateX(${x}px)`
      };
    },
    onHandleChange(i, val) {
      this.$store.commit("updateHue", {
        index: i,
        hue: val
      });
    },
    onSpectrumClick(e) {
      this.addHue(Math.floor((e.layerX / this.dimensions.width) * 360));
    },
    storeSpectrumDimensions: throttle(function() {
      const dimensions = this.$refs.spectrum.getBoundingClientRect();
      this.dimensions.left = dimensions.left;
      this.dimensions.right = dimensions.right;
      this.dimensions.width = dimensions.width;
    }, 500)
  }
};
</script>

<style scoped>
.spectrum {
  position: relative;

  padding-bottom: 28px;
}

.spectrum-gradient {
  height: var(--spectrum-height);
  background: linear-gradient(
    to right,
    red 0%,
    #ff0 17%,
    lime 33%,
    cyan 50%,
    blue 66%,
    #f0f 83%,
    red 100%
  );
  border-radius: var(--radius);
  cursor: copy;
}

.hues {
  position: absolute;
  top: calc(var(--spectrum-handle-overhang) * -1);
  left: 0;
  width: 100%;
}

.hue-input {
  font-size: 12px;
  color: var(--color-muted);
}
</style>
