import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Convenience function for mutations to reduce boilerplate
const set = key => (state, val) => {
  state[key] = val;
};

export default new Vuex.Store({
  state: {
    // Grays
    graySteps: 5,
    grayCast: 0,
    grayLumaStart: 105,
    grayLumaEnd: 0,

    // Color
    colorHues: [90, 180, 270, 360], //40, 200, 120, 200, 280, 320
    colorSteps: 5,
    colorLumaStart: 100,
    colorLumaEnd: 10,
    colorChromaStart: 30,
    colorChromaEnd: 120,

    // Options
    castMin: -50,
    castMax: 50,

    hueMin: 0,
    hueMax: 359,

    stepsMin: 2,
    stepsMax: 20,

    lumaMin: 0,
    lumaMax: 150,

    chromaMin: 0,
    chromaMax: 150,

    darkMode: false,
    showLabels: true
  },
  mutations: {
    // Grays
    setGraySteps: set("graySteps"),
    setGrayCast: set("grayCast"),
    setGrayLumaStart: set("grayLumaStart"),
    setGrayLumaEnd: set("grayLumaEnd"),

    // Color
    setColorHues(state, hues) {
      state.colorHues = [...hues];
    },
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

      state.colorHues = hues;
    },
    resetHues({ state, commit }, val) {
      commit("setColorHues", val);
    }
  }
});
