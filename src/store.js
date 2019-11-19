import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Convenience function for mutations to reduce boilerplate
const set = key => (state, val) => {
  state[key] = val;
};

export default new Vuex.Store({
  state: {
    // Ranges
    lumaMin: 0,
    lumaMax: 150,

    // Grays
    graySteps: 12,
    grayLumaStart: 0,
    grayLumaEnd: 100,
    grayCast: null, // Placeholder

    // Color
    colorHues: [40, 200, 120, 200, 280, 320], //
    colorSteps: 12,
    colorLumaStart: 0,
    colorLumaEnd: 100,
    colorChromaStart: 30,
    colorChromaEnd: 120,

    // Options
    hueMin: 0,
    hueMax: 359,

    stepsMin: 2,
    stepsMax: 20,
    // steps: 16,

    chromaMin: 0,
    chromaMax: 150,

    darkMode: false,
    showLabels: true
  },
  mutations: {
    // Grays
    setGraySteps: set("graySteps"),
    setGrayLumaStart: set("grayLumaStart"),
    setGrayLumaEnd: set("grayLumaEnd"),

    // Color
    setColorSteps: set("colorSteps"),
    setColorLumaStart: set("colorLumaStart"),
    setColorLumaEnd: set("colorLumaEnd"),
    setColorChromaStart: set("colorChromaStart"),
    setColorChromaEnd: set("colorChromaEnd"),

    updateHue(state, { index, hue }) {
      Vue.set(state.colorHues, index, hue);
    },
    removeHue(state, index) {
      state.colorHues.splice(index, 1);
    },

    setDarkMode: set("darkMode"),
    setShowLabels: set("showLabels"),

    setColors: set("colors")
  },
  actions: {
    addHue({ state, commit }, val) {
      if (typeof val === "undefined") {
        val = Math.floor(Math.random() * 360);
      }
      let hues = [...state.colorHues];
      hues.push(val);
      hues = hues.sort((a, b) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 0;
        }
        return 0;
      });

      state.colorHues = hues;
    }
  }
});
