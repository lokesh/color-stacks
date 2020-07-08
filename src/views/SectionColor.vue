<template>
  <section class="section-color">

    <div class="title-row">
      <h2>Colors</h2>
      <hex-input class="hex-input" />
    </div>

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

        <div class="control-col-section">
          <label class="label">Curves</label>
          <curve-toggle label="Luminance" v-model="colorLumaCurve" />
          <curve-toggle label="Chroma" v-model="colorChromaCurve" />
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
import CurveToggle from "../components/CurveToggle.vue";
import HexInput from "../components/HexInput.vue";
import Slider from "../components/Slider.vue";
import Spectrum from "../components/Spectrum";

export default {
  name: "Grays",

  components: {
    ColorStacks,
    CurveToggle,
    HexInput,
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
    colorLumaCurve: {
      get() {
        return this.$store.state.colorLumaCurve;
      },
      set(val) {
        this.$store.commit("setColorLumaCurve", val);
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
    },
    colorChromaCurve: {
      get() {
        return this.$store.state.colorChromaCurve;
      },
      set(val) {
        this.$store.commit("setColorChromaCurve", val);
      }
    }
  }
};
</script>

<style scoped>
.title-row {
  display: flex;
}

.hex-input {
  margin-left: 8px;
}

.section-color {
  padding: var(--block-padding);
}

.spectrum-row {
  margin-bottom: 12px;
}

.stack-row {
  display: flex;
}

.section-stacks {
  width: 100%;
  overflow-y: visible;
  overflow-x: auto;
  margin-left: var(--block-padding);
  margin-right: calc(var(--block-padding) * -1);
}
</style>
