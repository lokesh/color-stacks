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
    colorHues: [],
    colorSteps: 12,
    colorLumaStart: 0,
    colorLumaEnd: 100,
    colorChromaStart: 30,
    colorChromaEnd: 120,

    // Options
    hueMin: 0,
    hueMax: 360,

    stepsMin: 2,
    stepsMax: 20,
    // steps: 16,

    chromaMin: 0,
    chromaMax: 150,

    darkMode: false,
    showLabels: true,

    // Colors
    colors: [],

    // Deprecate
    hues: [40, 80, 120, 160, 200, 240, 280, 320]
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

    addHue(state, hue) {
      if (typeof hue === "undefined") {
        hue = Math.floor(Math.random() * 360);
      }
      state.hues.push(hue);
    },
    updateHue(state, { index, hue }) {
      Vue.set(state.hues, index, hue);
    },
    removeHue(state, index) {
      state.hues.splice(index, 1);
    },

    setDarkMode: set("darkMode"),
    setShowLabels: set("showLabels"),

    setColors: set("colors")
  },
  actions: {
    options({ state, commit }, options) {
      for (let [option, val] of Object.entries(options)) {
        const titleCasedOption =
          option.slice(0, 1).toLocaleUpperCase() + option.slice(1);
        const mutation = `set${titleCasedOption}`;
        commit(mutation, val);
      }

      // Regen color values
      // Loop on hues

      //  Add grays in first column always?

      // for (let i = 0; i < state.hues.length; i++) {
      //   console.log(state.hues[i]);
      // }

      // Loop on steps
      // Calc chroma
      // Calc luma
      // Optional Cast
      // Contrast check?
      // Name

      // commit('setColor')
    }
  }
});
