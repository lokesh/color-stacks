<template>
  <div class="gradient" ref="gradient">
    <div class="spectrum" @click="onSpectrumClick"></div>
    <div class="hues">
      <div v-for="hue in hues" class="hue">
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
  name: "Gradient",

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

    // TODO: Update width on resize
  },

  methods: {
    addHue(hue) {
      this.$store.dispatch("addHue", hue);
    },
    onSpectrumClick(e) {
      this.addHue(Math.floor((e.layerX / this.spectrumDimensions.width) * 360));
    },
    storeSpectrumDimensions() {
      this.spectrumDimensions = this.$refs.gradient.getBoundingClientRect();
    }
  }
};
</script>

<style scoped>
.gradient {
  --gradient-height: 48px;
  --handle-overhang: 4px;

  position: relative;
}

.spectrum {
  height: var(--gradient-height);
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
  padding-bottom: 24px;
}

.hue {
  position: absolute;
  top: calc(var(--handle-overhang) * -1);
}

.hue-handle {
  width: 12px;
  height: calc(var(--gradient-height) + var(--handle-overhang) * 2);
  background: white;
  border: 2px solid black;
  border-radius: var(--radius);
}
</style>
