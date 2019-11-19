<template>
  <div class="wrapper">
    <div class="spectrum" ref="spectrum" @click="onSpectrumClick"></div>
    <div class="hues">
      <div v-for="hue in hues" class="hue" :style="getHueStyles(hue)">
        <div class="hue-handle"></div>
        <div class="hue-input">
          {{ hue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Spectrum",

  data() {
    return {
      spectrumDOMRect: null
    };
  },

  computed: {
    hues() {
      return this.$store.state.colorHues;
    }
  },

  mounted() {
    this.storeSpectrumDimensions();

    // HACK
    // this.$refs.spectrum.click();
    // this.positionHues();
    // TODO: Update width on resize
  },

  methods: {
    addHue(hue) {
      console.log(hue);
      this.$store.dispatch("addHue", hue);
    },
    getHueStyles(hue) {
      if (!this.spectrumDimensions) return;

      let x = (hue / 360) * this.spectrumDimensions.width;
      return {
        transform: `translateX(${x}px)`
      };
    },
    onSpectrumClick(e) {
      this.addHue(Math.floor((e.layerX / this.spectrumDimensions.width) * 360));
    },
    storeSpectrumDimensions() {
      this.spectrumDimensions = this.$refs.spectrum.getBoundingClientRect();
    }
  }
};
</script>

<style scoped>
.wrapper {
  --spectrum-height: 48px;
  --handle-overhang: 3px;

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
  padding-bottom: 36px;
}

.hue {
  position: absolute;
  top: calc(var(--handle-overhang) * -1);
}

.hue-handle {
  width: 12px;
  height: calc(var(--spectrum-height) + var(--handle-overhang) * 2);
  background: white;
  border: var(--border);
  border-radius: var(--radius-sm);
}
</style>
