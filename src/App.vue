<template>
  <div class="app">
    <!-- <section>
      <control-panel/>
    </section> -->

    <!-- GRAYS -->

    <section class="gray">
      <div class="temp">
        Cast
      </div>
      <div class="palette-row">
        <div class="control-col">
          <stepper v-model="graySteps" />
          <slider v-model="grayLumas" :min="lumaMin" :max="lumaMax"></slider>
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
      <div class="gradient-row">
        <gradient />
      </div>
      <div class="palette-row">
        <div class="control-col">
          <stepper v-model="colorSteps" />
          <slider v-model="colorLumas" :min="lumaMin" :max="lumaMax"></slider>
          <slider
            v-model="colorChromas"
            :min="chromaMin"
            :max="chromaMax"
          ></slider>
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
import Gradient from "./components/Gradient";
import Palette from "./components/Palette.vue";
import Slider from "./components/Slider.vue";
import Stepper from "./components/Stepper.vue";

export default {
  name: "app",
  components: {
    Gradient,
    Palette,
    Stepper,
    Slider
  },

  data() {
    return {
      // grayLumas: [0, 50],
    };
  },

  computed: {
    ...mapState([
      "lumaMin",
      "lumaMax",
      "chromaMin",
      "chromaMax",

      "grayLumaStart",
      "grayLumaEnd",

      "colorHues",
      "colorLumaStart",
      "colorLumaEnd",
      "colorChromaStart",
      "colorChromaEnd"
    ]),
    graySteps: {
      get() {
        return this.$store.state.graySteps;
      },
      set(val) {
        this.$store.commit("setGraySteps", val);
      }
    },
    grayLumas: {
      get() {
        return [this.grayLumaStart, this.grayLumaEnd];
      },
      set(val) {
        this.$store.commit("setGrayLumaStart", val[0]);
        this.$store.commit("setGrayLumaEnd", val[1]);
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
    colorLumas: {
      get() {
        return [this.colorLumaStart, this.colorLumaEnd];
      },
      set(val) {
        this.$store.commit("setColorLumaStart", val[0]);
        this.$store.commit("setColorLumaEnd", val[1]);
      }
    },
    colorChromas: {
      get() {
        return [this.colorChromaStart, this.colorChromaEnd];
      },
      set(val) {
        this.$store.commit("setColorChromaStart", val[0]);
        this.$store.commit("setColorChromaEnd", val[1]);
      }
    }
  }
};
</script>

<style>
@import "./styles/variables.css";
@import "./styles/base.css";
@import "./styles/vue-slider-component.css";
</style>

<style scoped>
.app {
  display: flex;
  padding: 24px;
}

.gradient-row {
  width: 480px;
  margin-bottom: 16px;
}

.palettes {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 16px;
}

.palette {
  /*  margin-right: var(--palette-gap);*/
}

/* Gray section */
.gray {
}

.palette-row {
  display: flex;
}
</style>
