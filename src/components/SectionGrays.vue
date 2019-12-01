<template>
  <section class="gray">
    <h2>Grays</h2>
    <div class="palette-row">
      <div class="control-col">
        <div class="control-col-section">
          <slider
            v-model="graySteps"
            label="Steps"
            :min="stepsMin"
            :max="stepsMax"
          />

          <slider
            v-model="grayCast"
            label="Cast"
            :min="castMin"
            :max="castMax"
          ></slider>
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
          label="gray"
          :hue="grayHue"
          :steps="graySteps"
          :start-chroma="grayChroma"
          :end-chroma="grayChroma"
          :start-luma="grayLumaStart"
          :end-luma="grayLumaEnd"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

import Palette from "./Palette.vue";
import Slider from "./Slider.vue";

export default {
  name: "Grays",

  components: {
    Palette,
    Slider
  },

  computed: {
    ...mapState([
      "castMin",
      "castMax",
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
    grayHue() {
      /*
      - For warm cast: Greenish-yellow hue
      - For cool cast: Blue hue
      */
      return this.grayCast >= 0 ? 75 : 270;
    },
    grayChroma() {
      return Math.abs(this.grayCast / 10);
    }
  }
};
</script>

<style scoped></style>
