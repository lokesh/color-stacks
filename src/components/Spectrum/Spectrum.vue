<!-- @pointerdown="onPointerDown"
@pointermove="onPointerMove"
@pointerup="onPointerUp"
:style="getHueStyles(hue)"-->
<template>
  <div class="wrapper">
    <div class="spectrum" ref="spectrum" @click="onSpectrumClick"></div>
    <div class="hues">
      <spectrum-handle v-for="(hue, index) in hues" :key="`hue-${index}`">
        <div class="hue-handle"></div>
        <div class="hue-input">
          {{ hue }}
        </div>
      </spectrum-handle>
    </div>
  </div>
</template>

<script>
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
      isDragging: false,
      dimensions: {
        left: 0,
        right: 0,
        width: 0
      }
    };
  },

  computed: {
    hues() {
      return this.$store.state.colorHues;
    }
  },

  mounted() {
    this.storeSpectrumDimensions();
    // debugger;
    // HACK
    // this.$refs.spectrum.click();
    // this.positionHues();
    // TODO: Update width on resize
  },

  methods: {
    addHue(hue) {
      // console.log(hue);
      this.dimensions.width = 800;
      this.$store.dispatch("addHue", hue);
    },
    getHueStyles(hue) {
      let x = (hue / 360) * this.width;
      return {
        transform: `translateX(${x}px)`
      };
    },
    // onPointerDown(e) {
    //   console.log("down");
    // },
    // onPointerMove(e) {
    //   console.log("move");
    // },
    // onPointerUp(e) {
    //   console.log("up");
    // },
    onSpectrumClick(e) {
      this.addHue(Math.floor((e.layerX / this.dimensions.width) * 360));
    },
    storeSpectrumDimensions() {
      const dimensions = this.$refs.spectrum.getBoundingClientRect();
      this.dimensions.left = dimensions.left;
      this.dimensions.right = dimensions.right;
      this.dimensions.width = dimensions.width;
    }
  }
};
</script>

<style scoped>
.wrapper {
  position: relative;
}

.spectrum {
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
