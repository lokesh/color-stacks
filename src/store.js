import Vue from "vue";
import Vuex from "vuex";

import {
  curves,
  CURVE_LINEAR,
  getContrastRatio,
  hclToHex
} from "./utils/color.js";

import { generateLabel } from "./utils/naming.js";

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
    grayLumaStart: 98, //98
    grayLumaEnd: 5, // 5
    grayLumaCurve: CURVE_LINEAR,

    // Color

    // Test values:
    // 90, 180, 270, 360
    // 40, 200, 120, 200, 280, 320
    colorHues: [],
    colorSteps: 5,
    colorLumaStart: 100,
    colorLumaEnd: 10,
    colorLumaCurve: CURVE_LINEAR,
    colorChromaStart: 20,
    colorChromaEnd: 140,
    colorChromaCurve: CURVE_LINEAR,

    // Options
    showLabel: true,
    showHex: false,
    showContrastRatio: false,
    // darkMode: false, // Not implemented

    // Interaction states
    isMobile: null,
    highlightHue: null, // Index of Hue
    modal: null,

    // Config
    castMin: -50,
    castMax: 50,

    hueMin: 0,
    hueMax: 359,
    hueSliderWidth: 16,

    stepsMin: 2,
    stepsMax: 20,

    lumaMin: 0,
    lumaMax: 110,

    chromaMin: 0,
    chromaMax: 150
  },

  mutations: {
    // Grays
    setGraySteps: set("graySteps"),
    setGrayCast: set("grayCast"),
    setGrayLumaStart: set("grayLumaStart"),
    setGrayLumaEnd: set("grayLumaEnd"),
    setGrayLumaCurve: set("grayLumaCurve"),

    // Color
    setColorHues(state, hues) {
      state.colorHues = [...hues];
    },
    setColorSteps: set("colorSteps"),
    setColorLumaStart: set("colorLumaStart"),
    setColorLumaEnd: set("colorLumaEnd"),
    setColorLumaCurve: set("colorLumaCurve"),
    setColorChromaStart: set("colorChromaStart"),
    setColorChromaEnd: set("colorChromaEnd"),
    setColorChromaCurve: set("colorChromaCurve"),

    updateHue(state, { index, hue }) {
      Vue.set(state.colorHues, index, hue);
    },
    removeHue(state, index) {
      state.colorHues.splice(index, 1);
    },

    // Options
    setDarkMode: set("darkMode"),
    setShowLabel: set("showLabel"),
    setShowHex: set("showHex"),
    setShowContrastRatio: set("showContrastRatio"),

    // Interaction states
    setIsMobile: set("isMobile"),
    highlightHue(state, index) {
      state.highlightHue = index;
    },
    unhighlightHue(state) {
      state.highlightHue = null;
    },
    openModal(state, val) {
      state.modal = val;
    },
    closeModal(state) {
      state.modal = null;
    }
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
    reset({ commit }) {
      commit("setGraySteps", 5);
      commit("setGrayLumaStart", 98);
      commit("setGrayLumaEnd", 5);
      commit("setGrayLumaCurve", CURVE_LINEAR);
      commit("setColorHues", []);
      commit("setColorSteps", 5);
      commit("setColorLumaStart", 100);
      commit("setColorLumaEnd", 10);
      commit("setColorLumaCurve", CURVE_LINEAR);
      commit("setColorChromaStart", 20);
      commit("setColorChromaEnd", 140);
      commit("setColorChromaCurve", CURVE_LINEAR);
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

        let percent = i / (state.graySteps - 1);
        percent = curves[state.grayLumaCurve](percent);

        let l =
          state.grayLumaStart +
          (state.grayLumaEnd - state.grayLumaStart) * percent;

        let hex = hclToHex({ h, c, l });

        // WCAG contrast ratio
        let isDark = l < 50;
        let textColor = isDark ? "#ffffff" : "#000000";

        grays.push({
          hex,
          label: generateLabel({ label: "gray", hex, h, c, l }),
          h,
          c,
          l,
          contrastRatio: getContrastRatio(textColor, hex),
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

          let chromaPercent = i / (state.colorSteps - 1);
          chromaPercent = curves[state.colorChromaCurve](chromaPercent);

          let c =
            state.colorChromaStart +
            (state.colorChromaEnd - state.colorChromaStart) * chromaPercent;

          let lumaPercent = i / (state.colorSteps - 1);
          lumaPercent = curves[state.colorLumaCurve](lumaPercent);

          let l =
            state.colorLumaStart +
            (state.colorLumaEnd - state.colorLumaStart) * lumaPercent;

          let hex = hclToHex({ h, c, l });

          // WCAG contrast ratio
          let isDark = l < 50;
          let textColor = isDark ? "#ffffff" : "#000000";

          hueObj.colors.push({
            hex,
            h,
            c,
            l,
            label: generateLabel({ hex, h, c, l }),
            contrastRatio: getContrastRatio(textColor, hex),
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
