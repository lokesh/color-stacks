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

        <div class="control-col-section">
          <label class="label">Curves</label>
          <popover>
            <template v-slot:trigger>
              <button class="control-col__btn">{{ curveButtonLabel }}</button>
            </template>
            <div>
              <h3>Luminence</h3>
              <div class="radio-group">
                <label class="label label--radio">
                  <input
                    type="radio"
                    name="color-luma-curve"
                    :value="CURVE_LINEAR"
                    v-model="colorLumaCurve"
                  />
                  Linear
                </label>
                <label class="label label--radio">
                  <input
                    type="radio"
                    name="color-luma-curve"
                    :value="CURVE_EASE"
                    v-model="colorLumaCurve"
                  />
                  Ease-in-out
                </label>
              </div>

              <h3>Chroma</h3>
              <div class="radio-group">
                <label class="label label--radio">
                  <input
                    type="radio"
                    name="color-chroma-curve"
                    :value="CURVE_LINEAR"
                    v-model="colorChromaCurve"
                  />
                  Linear
                </label>
                <label class="label label--radio">
                  <input
                    type="radio"
                    name="color-chroma-curve"
                    :value="CURVE_EASE"
                    v-model="colorChromaCurve"
                  />
                  Ease-in-out
                </label>
              </div>
            </div>
          </popover>
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

import { CURVE_LINEAR, CURVE_EASE } from "../utils/color.js";

import ColorStacks from "./ColorStacks.vue";
import Popover from "../components/Popover.vue";
import Slider from "../components/Slider.vue";
import Spectrum from "../components/Spectrum";

export default {
  name: "Grays",

  components: {
    ColorStacks,
    Popover,
    Slider,
    Spectrum
  },

  data() {
    return {
      CURVE_LINEAR,
      CURVE_EASE
    };
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
    },
    curveButtonLabel() {
      if (
        this.colorLumaCurve === CURVE_LINEAR &&
        this.colorChromaCurve === CURVE_LINEAR
      ) {
        return "Linear";
      } else if (
        this.colorLumaCurve === CURVE_EASE &&
        this.colorChromaCurve === CURVE_EASE
      ) {
        return "Ease-in-out";
      } else if (
        this.colorLumaCurve === CURVE_LINEAR &&
        this.colorChromaCurve === CURVE_EASE
      ) {
        return "Linear & Ease";
      } else {
        return "Ease & Linear";
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
