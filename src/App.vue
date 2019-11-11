<template>
  <div class="app">
    <section class="app-controls">
      <control-panel/>
    </section>
    <vue-slider
      v-model="grayLumas"
      direction="ttb"
      :min="lumaMin"
      :max="lumaMax"
      :duration="0.25"
      :dot-size="24"
      :height="200" 
    ></vue-slider>

    <stepper />

    <section class="app-output">
      <div class="palettes">
        <palette
          class="palette"
          :steps="graySteps"
          :start-chroma="0"
          :end-chroma="0"
          :start-luma="grayLumaStart"
          :end-luma="grayLumaEnd"
        ></palette>

        <palette
          v-for="(hue, index) in hues"
          :key="index"
          class="palette"
          :array-index="index"
          :hue="hue"
          :steps="steps"
          :start-chroma="chromaStart"
          :end-chroma="chromaEnd"
          :start-luma="lumaStart"
          :end-luma="lumaEnd"
        ></palette>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ControlPanel from "./components/ControlPanel.vue";
import Palette from "./components/Palette.vue";
import Stepper from "./components/Stepper.vue";

import VueSlider from 'vue-slider-component'

import 'vue-slider-component/theme/material.css'

export default {
  name: "app",
  components: {
    ControlPanel,
    Palette,
    Stepper,
    VueSlider,
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

      "graySteps",
      "grayLumaStart",
      "grayLumaEnd",


      "hues",
      "chromaStart",
      "chromaEnd",
      "lumaStart",
      "lumaEnd",
      "steps"
    ]),
    grayLumas: {
      get() {
        return [this.grayLumaStart, this.grayLumaEnd];
      },
      set(val) {
        this.$store.commit('setGrayLumaStart', val[0]);
        this.$store.commit('setGrayLumaEnd', val[1]);        
      },
    }
  },

  // methods: {
  //   getHCL(n) {
  //     // let c = chroma.hcl((n - 1) * 40, 20, 90);
  //     return c;
  //   }
  // },
  // watch: {
  //   darkMode() {
  //     const body = document.querySelector("body");
  //     body.classList.toggle("dark-mode");
  //   }
  // }
};
</script>

<style>
:root {
  --color: #444;
  --bg-color: #fff;

  --border-color: #d4d4d4;
  --border: 1px solid var(--border-color);
  --radius: 8px;

  --focus-color: #18bdff;

  --palette-gap: 16px;
  --swatch-gap: 0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
}

body,
button,
input {
  color: var(--color);  
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

input[type="number"] {
  padding: 4px 8px;
  border: var(--border);
  border-radius: 3px;
}

input[type="number"]:focus {
  outline: none;
  border-color: var(--focus-color);
  box-shadow: 0 0 0 1px var(--focus-color);
}
</style>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-controls {
  flex: 0 0 auto;
  padding: 16px;
  background: white;
  font-family: var(--monospace);
  font-size: 13px;
  border-bottom: var(--border);
}

.app-output {
  flex: 1 1 auto;
  width: 100vw;
  overflow-x: scroll;
}

.palettes {
  display: flex;
  flex-wrap: nowrap;
  padding: 16px;
}

.palette {
  margin-right: var(--palette-gap);
}
</style>
