import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Convenience function for mutations to reduce boilerplate
const set = key => (state, val) => {
  state[key] = val;
};

export default new Vuex.Store({
  state: {
    hues: [0, 30, 60, 90],
    hueMin: 0,
    hueMax: 360,

    stepsMin: 2,
    stepsMax: 20,
    steps: 10,

    chromaMin: 0,
    chromaMax: 150,
    chromaStart: 30,
    chromaEnd: 120,

    lumaMin: 0,
    lumaMax: 150,
    lumaStart: 100,
    lumaEnd: 0,

    darkMode: false,
    showLabels: true
  },
  mutations: {
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
    setShowLabels: set("showLabels")
  },
  actions: {
    // foo2({ commit }, val) {
    //   commit("setName", val);
    // }
  }
});
