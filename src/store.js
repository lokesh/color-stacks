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
    grayLumaStart: 0,
    grayLumaEnd: 100,
    graySteps: 16,
    grayCast: null, // Placeholder

    // Color
    colorHues: [],
    colorLumaStart: 100,
    colorLumaEnd: 0,
    colorChromaStart: 30,
    colorChromaEnd: 120,


    // Options
    hueMin: 0,
    hueMax: 360,

    stepsMin: 2,
    stepsMax: 20,
    steps: 12,

    chromaMin: 0,
    chromaMax: 150,

    chromaStart: 30,
    chromaEnd: 120,

    lumaStart: 100,
    lumaEnd: 0,

    darkMode: false,
    showLabels: true,

    // Colors
    colors: [],

    // Deprecate
    hues: [60, 120, 180, 240, 300],
  },
  mutations: {

    setGrayLumaStart: set("grayLumaStart"),
    setGrayLumaEnd: set("grayLumaEnd"),

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
    setSteps: set("steps"),
    setChromaStart: set("chromaStart"),
    setChromaEnd: set("chromaEnd"),
    setLumaStart: set("lumaStart"),
    setLumaEnd: set("lumaEnd"),

    setDarkMode: set("darkMode"),
    setShowLabels: set("showLabels"),
    
    setColors: set("colors"),
  },
  actions: {
    options({ state, commit }, options) {
      for (let [option, val] of Object.entries(options)) { 
        const titleCasedOption = option.slice(0, 1).toLocaleUpperCase() + option.slice(1);
        const mutation = `set${titleCasedOption}`;
        commit(mutation, val);
      }

      // Regen color values
      // Loop on hues


      //  Add grays in first column always?


      state.hues.forEach( (hue) => {
        for (let i = 0; i < state.steps; i++) {

        };
      })
      // for (let i = 0; i < state.hues.length; i++) {
      //   console.log(state.hues[i]);
      // }
      
      // Loop on steps
      // Calc chroma
      // Calc luma
      // Optional Cast
      // Contrast check?
      // Name



      // commit("setColor")
      
    }

  }
});
