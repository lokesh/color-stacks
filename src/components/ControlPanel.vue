<template>
  <div>
    <!--  <input type="range" min="1" max="18" step="1" v-model.number="hues">
    {{ hues }} -->
    <button type="button" @click="addHue">Add Hue</button>
    <br>Steps (Rows):
    <input
      type="range"
      :min="stepsMin"
      :max="stepsMax"
      step="1"
      v-model.number="steps"
    >
    {{ steps }}
    <br>Start Chroma:
    <input type="range" :min="chromaMin" :max="chromaMax" v-model.number="chromaStart">
    {{ chromaStart }}
    <br>End Chroma:
    <input type="range" :min="chromaMin" :max="chromaMax" v-model.number="chromaEnd">
    {{ chromaEnd }}
    <br>Start luminance:
    <input type="range" :min="lumaMin" :max="lumaMax" v-model.number="lumaStart">
    {{ lumaStart }}
    <br>End luminance:
    <input type="range" :min="lumaMin" :max="lumaMax" v-model.number="lumaEnd">
    {{ lumaEnd }}
    <br>
    Cast - Cool to Warm<br>

    <label class="checkbox-label">
      Show swatch labels:
      <input type="checkbox" v-model="showLabels" class="checkbox">
      <br>
    </label>
    <label class="checkbox-label">
      Dark mode:
      <input type="checkbox" v-model="darkMode" class="checkbox">
      <br>
    </label>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "control-panel",
  computed: {
    ...mapState([
      "stepsMin",
      "stepsMax",
      "chromaMin",
      "chromaMax",
      "lumaMin",
      "lumaMax"
    ]),
    chromaStart: {
      get: function() {
        return this.$store.state.chromaStart;
      },
      set: function(val) {
        this.$store.dispatch('options', { 'chromaStart': val});
        // this.$store.commit("setChromaStart", val);
      }
    },
    chromaEnd: {
      get: function() {
        return this.$store.state.chromaEnd;
      },
      set: function(val) {
        this.$store.dispatch('options', { 'chromaEnd': val});
        // this.$store.commit("setChromaEnd", val);
      }
    },
    darkMode: {
      get: function() {
        return this.$store.state.darkMode;
      },
      set: function(val) {
        this.$store.commit("setDarkMode", val);
      }
    },
    lumaStart: {
      get: function() {
        return this.$store.state.lumaStart;
      },
      set: function(val) {
        this.$store.commit("setLumaStart", val);
      }
    },
    lumaEnd: {
      get: function() {
        return this.$store.state.lumaEnd;
      },
      set: function(val) {
        this.$store.commit("setLumaEnd", val);
      }
    },
    showLabels: {
      get: function() {
        return this.$store.state.showLabels;
      },
      set: function(val) {
        this.$store.commit("setShowLabels", val);
      }
    },
    steps: {
      get: function() {
        return this.$store.state.steps;
      },
      set: function(val) {
        this.$store.commit("setSteps", val);
      }
    }
  },
  methods: {
    addHue() {
      this.$store.commit("addHue");
    }
  }
};
</script>

<style scoped>
</style>
