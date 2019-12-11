<template>
  <section class="section-color">
    <h2>Colors</h2>
    <div class="spectrum-row">
      <spectrum />
    </div>
    <div class="stack-row">
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


        <div>
          <label class="label">Curves</label>
          <button class="control-col__btn">Ease-in-out&hellip;</button>
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
      <div class="section-stacks">
        <color-stacks />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

import ColorStacks from "./ColorStacks.vue";
import Slider from "../components/Slider.vue";
import Spectrum from "../components/Spectrum";

export default {
  name: "Grays",

  components: {
    ColorStacks,
    Slider,
    Spectrum
  },

  computed: {
    ...mapState([
      "colorHues",
      "chromaMin",
      "chromaMax",
      "lumaMin",
      "lumaMax",
      "stepsMin",
      "stepsMax"
    ]),
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
  margin-bottom: 12px;
}
.stack-row {
  display: flex;
}

.section-stacks {
  padding: 0 16px;
}
</style>
