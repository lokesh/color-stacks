<template>
  <section class="section-color">
    <h2>Colors</h2>
    <div class="spectrum-row">
      <spectrum />
    </div>
    <div class="palette-row">
      <div class="control-col" v-if="colorHues.length">
        <div class="control-col-section">
          <slider
            v-model="colorSteps"
            label="Steps"
            :min="stepsMin"
            :max="stepsMax"
          ></slider>
          <slider
            label="Luminance"
            v-model="colorLumaStart"
            :min="lumaMin"
            :max="lumaMax"
          ></slider>
          <slider
            label="Chroma"
            v-model="colorChromaStart"
            :min="chromaMin"
            :max="chromaMax"
          ></slider>
        </div>

        <div class="control-col-section">
          <slider
            label="Luminance"
            v-model="colorLumaEnd"
            :min="lumaMin"
            :max="lumaMax"
          ></slider>
          <slider
            label="Chroma"
            v-model="colorChromaEnd"
            :min="chromaMin"
            :max="chromaMax"
          ></slider>
        </div>
      </div>
      <div class="palettes">
        <palette
          v-for="(hue, index) in colorHuesSorted"
          :key="index"
          class="palette"
          :unsorted-index="hue.unsortedIndex"
          :hue="hue.value"
          :steps="colorSteps"
          :start-chroma="colorChromaStart"
          :end-chroma="colorChromaEnd"
          :start-luma="colorLumaStart"
          :end-luma="colorLumaEnd"
        ></palette>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

import Palette from "./Palette.vue";
import Slider from "./Slider.vue";
import Spectrum from "./Spectrum";

export default {
  name: "Grays",

  components: {
    Palette,
    Slider,
    Spectrum
  },

  computed: {
    ...mapState([
      "chromaMin",
      "chromaMax",
      "colorHues",
      "lumaMin",
      "lumaMax",
      "stepsMin",
      "stepsMax"
    ]),
    colorHuesSorted() {
      return this.$store.getters.colorHuesSorted;
    },
    colorSteps: {
      get() {
        return this.$store.state.colorSteps;
      },
      set(val) {
        this.$store.commit("setColorSteps", val);
      }
    },
    colorLumaStart: {
      get() {
        return this.$store.state.colorLumaStart;
      },
      set(val) {
        this.$store.commit("setColorLumaStart", val);
      }
    },
    colorLumaEnd: {
      get() {
        return this.$store.state.colorLumaEnd;
      },
      set(val) {
        this.$store.commit("setColorLumaEnd", val);
      }
    },
    colorChromaStart: {
      get() {
        return this.$store.state.colorChromaStart;
      },
      set(val) {
        this.$store.commit("setColorChromaStart", val);
      }
    },
    colorChromaEnd: {
      get() {
        return this.$store.state.colorChromaEnd;
      },
      set(val) {
        this.$store.commit("setColorChromaEnd", val);
      }
    }
  }
};
</script>

<style scoped>
.section-color {
  flex: 1 1 auto;
  padding: 16px 32px 16px 16px;
}
.spectrum-row {
  margin-bottom: 24px;
}
</style>
