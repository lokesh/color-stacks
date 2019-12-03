import Vue from "vue";
import Vuex from "vuex";

import * as utils from "./utils.js";

Vue.use(Vuex);

// Convenience function for mutations to reduce boilerplate
const set = key => (state, val) => {
  state[key] = val;
};

export default new Vuex.Store({
  state: {
    // Grays
    graySteps: 4,
    grayCast: 0,
    grayLumaStart: 105,
    grayLumaEnd: 0,

    // Color
    // 90, 180, 270, 360
    // 40, 200, 120, 200, 280, 320
    colorHues: [],
    colorSteps: 5,
    colorLumaStart: 100,
    colorLumaEnd: 10,
    colorChromaStart: 30,
    colorChromaEnd: 120,

    // Options
    darkMode: false,
    showLabels: true,

    // Interaction states
    highlightHue: null, // Index of Hue
    isExportModalOpen: false,

    // Config
    castMin: -50,
    castMax: 50,

    hueMin: 0,
    hueMax: 359,
    hueSliderWidth: 16,

    stepsMin: 2,
    stepsMax: 20,

    lumaMin: 0,
    lumaMax: 150,

    chromaMin: 0,
    chromaMax: 150
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

    // Options
    setDarkMode: set("darkMode"),
    setShowLabels: set("showLabels"),

    // Interaction states
    highlightHue(state, index) {
      state.highlightHue = index;
    },
    unhighlightHue(state) {
      state.highlightHue = null;
    },
    setIsExportModalOpen: set("isExportModalOpen")
  },

  actions: {
    addHue({ state, commit }, val) {
      if (typeof val === "undefined") {
        val = Math.floor(Math.random() * 360);
      }
      let hues = [...state.colorHues];
      hues.push(val);

      commit("setColorHues", hues);
    },
    initStore() {
      // in App.vue this.$store.dispatch('initStore');
    },
    resetHues({ commit }, val) {
      commit("setColorHues", val);
    }
  },

  getters: {
    grayChroma: state => {
      return Math.abs(state.grayCast / 10);
    },
    grayHue: state => {
      return state.grayCast >= 0 ? 75 : 270;
    },
    stacks: (state, getters) => {
      /* ---------- */
      /* Gray stack */
      /* ---------- */

      let grays = [];
      for (let i = 0; i < state.graySteps; i++) {
        let h = getters.grayHue;
        let c = getters.grayChroma;
        let l =
          state.grayLumaStart +
          (state.grayLumaEnd - state.grayLumaStart) *
            (i / (state.graySteps - 1));
        let hex = utils.hclToHex({ h, c, l });

        // WCAG contrast ratio
        let isDark = l < 50;
        let textColor = isDark ? "#ffffff" : "#000000";

        grays.push({
          hex,
          label: utils.generateLabel({ label: "gray", hex, h, c, l }),
          contrastRatio: utils.getContrastRatio(textColor, hex),
          isDark
        });
      }

      /* ------------ */
      /* Color stacks */
      /* ------------ */

      let colors = [];

      state.colorHues.map((hue, index) => {
        let hueObj = {
          hue,
          unsortedIndex: index,
          colors: []
        };

        for (let i = 0; i < state.colorSteps; i++) {
          let h = hue;
          let c =
            state.colorChromaStart +
            (state.colorChromaEnd - state.colorChromaStart) *
              (i / (state.colorSteps - 1));
          let l =
            state.colorLumaStart +
            (state.colorLumaEnd - state.colorLumaStart) *
              (i / (state.colorSteps - 1));
          let hex = utils.hclToHex({ h, c, l });

          // WCAG contrast ratio
          let isDark = l < 50;
          let textColor = isDark ? "#ffffff" : "#000000";

          hueObj.colors.push({
            hex,
            label: utils.generateLabel({ hex, h, c, l }),
            contrastRatio: utils.getContrastRatio(textColor, hex),
            isDark
          });
        }
        colors.push(hueObj);
      });

      // Sort colors
      colors.sort((a, b) => {
        if (a.hue < b.hue) {
          return -1;
        } else if (a.hue > b.hue) {
          return 1;
        }
        return 0;
      });

      return {
        grays: grays,
        colors: colors
      };
    }
  }
});
