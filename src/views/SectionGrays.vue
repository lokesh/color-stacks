<template>
  <section class="section-grays">
    <h2>Grays</h2>
    <div class="stack-row">
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
            label="Temperature"
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
          <label class="label">Curve</label>
          <curve-toggle label="Luminance" v-model="grayLumaCurve" />
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

      <div class="section-stacks">
        <grays-stack />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

import GraysStack from "./GraysStack.vue";
import CurveToggle from "../components/CurveToggle.vue";
import Slider from "../components/Slider.vue";

export default {
  name: "Grays",

  components: {
    CurveToggle,
    GraysStack,
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
    grayLumaCurve: {
      get() {
        return this.$store.state.grayLumaCurve;
      },
      set(val) {
        this.$store.commit("setGrayLumaCurve", val);
      }
    }
  }
};
</script>

<style scoped>
.section-grays {
  padding: var(--block-padding);
}

.stack-row {
  display: flex;
}

.section-stacks {
  margin-left: var(--block-padding);
}
</style>
