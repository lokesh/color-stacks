<template>
  <div class="app">
    <section class="gray">
      <!-- <div class="temp">
        Cast
      </div> -->
      <div class="palette-row">
        <div class="control-col">
          <div class="control-col-section">
            <slider
              v-model="graySteps"
              label="Steps"
              :min="stepsMin"
              :max="stepsMax"
            ></slider>
            <slider
              v-model="grayLumaStart"
              label="Luminance"
              :min="lumaMin"
              :max="lumaMax"
            ></slider>
          </div>
          <div class="control-col-section">
            <slider
              v-model="grayLumaEnd"
              label="Luminance"
              :min="lumaMin"
              :max="lumaMax"
            ></slider>
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
          ></palette>
        </div>
      </div>
    </section>

    <!-- COLOR -->

    <section class="color">
      <div class="spectrum-row">
        <spectrum />
      </div>
      <div class="palette-row">
        <div class="control-col">
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
            v-for="(hue, index) in colorHues"
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
      "stepsMin",
      "stepsMax",
      "lumaMin",
      "lumaMax",
      "chromaMin",
      "chromaMax",
      "colorHues"
    ]),
    graySteps: {
      get() {
        return this.$store.state.graySteps;
      },
      set(val) {
        this.$store.commit("setGraySteps", val);
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

<style>
@import "./styles/base.css";
@import "./styles/vue-slider-component.css";
</style>

<style scoped>
.app {
  display: flex;
  padding: 24px;
}

.control-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /*align-items: flex-end;*/
  width: 80px;

  & .control-col-section {
    /*width: 120px;
    background: yellow;*/
  }
}

.palettes {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 16px;
}

.palette {
  margin-right: var(--palette-gap);
}

/* Gray section */
.gray {
  margin-right: 24px;
}

.color {
  flex: 1 1 auto;
}

.spectrum-row {
  width: 640px;
  margin-bottom: 16px;
}

.palette-row {
  display: flex;
}
</style>
