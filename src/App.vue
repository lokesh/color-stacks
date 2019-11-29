<template>
  <div class="app">
    <div>
      <h4>Presets</h4>
      <button class="btn" @click="reset0">Reset</button><br />
      <button class="btn" @click="reset1">3 colors</button><br />
      <button class="btn" @click="reset2">6 colors</button><br />
      <button class="btn">Custom</button>
    </div>
    <section class="gray">
      <h3>Grays</h3>
      <div class="palette-row">
        <div class="control-col">
          <div class="control-col-section">
            <slider
              v-model="graySteps"
              label="Steps"
              :min="stepsMin"
              :max="stepsMax"
            />
            <!--             <slider
              v-model="grayCast"
              label="Cast"
              :min="castMin"
              :max="castMax"
            ></slider>
 -->
            <slider
              v-model="grayLumaStart"
              label="Luminance"
              :min="lumaMin"
              :max="lumaMax"
            />
          </div>
          <div class="control-col-section">
            <slider
              v-model="grayLumaEnd"
              label="Luminance"
              :min="lumaMin"
              :max="lumaMax"
            />
          </div>
        </div>
        <div class="palettes">
          <palette
            class="palette"
            :steps="graySteps"
            :start-chroma="0"
            :end-chroma="0"
            :start-luma="grayLumaStart"
            :end-luma="grayLumaEnd"
          />
        </div>
      </div>
    </section>

    <!-- COLOR -->

    <section class="color">
      <h3>Colors</h3>
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
            :array-index="index"
            :hue="hue"
            :steps="colorSteps"
            :start-chroma="colorChromaStart"
            :end-chroma="colorChromaEnd"
            :start-luma="colorLumaStart"
            :end-luma="colorLumaEnd"
          ></palette>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Spectrum from "./components/Spectrum";
import Palette from "./components/Palette.vue";
import Slider from "./components/Slider.vue";

export default {
  name: "app",
  components: {
    Palette,
    Spectrum,
    Slider
  },

  data() {
    return {
      // grayLumas: [0, 50],
    };
  },

  computed: {
    ...mapState([
      "castMin",
      "castMax",
      "chromaMin",
      "chromaMax",
      "colorHues",
      "lumaMin",
      "lumaMax",
      "stepsMin",
      "stepsMax"
    ]),

    graySteps: {
      get() {
        return this.$store.state.graySteps;
      },
      set(val) {
        this.$store.commit("setGraySteps", val);
      }
    },
    grayCast: {
      get() {
        return this.$store.state.grayCast;
      },
      set(val) {
        this.$store.commit("setGrayCast", val);
      }
    },
    grayLumaStart: {
      get() {
        return this.$store.state.grayLumaStart;
      },
      set(val) {
        this.$store.commit("setGrayLumaStart", val);
      }
    },
    grayLumaEnd: {
      get() {
        return this.$store.state.grayLumaEnd;
      },
      set(val) {
        this.$store.commit("setGrayLumaEnd", val);
      }
    },
    colorHuesSorted() {
      return [...this.colorHues].sort((a, b) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        }
        return 0;
      });
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
  },
  methods: {
    reset0() {
      this.$store.dispatch("resetHues", []);
    },
    reset1() {
      this.$store.dispatch("resetHues", [30, 80, 120]);
    },
    reset2() {
      this.$store.dispatch("resetHues", [0, 60, 120, 180, 240, 300]);
    }
  }
};
</script>

<style>
@import "./styles/base.css";
@import "./styles/vue-slider-component.css";
</style>

<style scoped>
.app {
  display: flex;
  /*padding: 24px;*/
  border-bottom: var(--border-light);
  background: white;
}

.control-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80px;
}

.palettes {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 16px;
}

.palette {
  margin-right: var(--palette-gap);
}

.palette:last-of-type {
  margin-right: 0;
}

/* Gray section */
.gray {
  padding: 36px;
  border-right: var(--border-light);
}

.color {
  flex: 1 1 auto;
  padding: 36px;
}

.spectrum-row {
  width: 640px;
  /*  height: 64px;*/
  margin-bottom: 24px;
}

.palette-row {
  display: flex;
}
</style>
