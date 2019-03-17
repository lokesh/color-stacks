<template>
  <div>
    <section class="app-controls">
      Hues (Columns):
      <input type="range" min="1" max="18" step="1" v-model.number="hues">
      {{ hues }}
      <br>Steps (Rows):
      <input type="range" min="1" max="20" step="1" v-model.number="steps">
      {{ steps }}
      <br>Start Chroma:
      <input type="range" min="1" max="150" v-model.number="startChroma">
      {{ startChroma }}
      <br>End Chroma:
      <input type="range" min="1" max="150" v-model.number="endChroma">
      {{ endChroma }}
      <br>Start luminance:
      <input type="range" min="1" max="150" v-model.number="startLuma">
      {{ startLuma }}
      <br>End luminance:
      <input type="range" min="1" max="150" v-model.number="endLuma">
      {{ endLuma }}
      <br>
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
    </section>
    <section>
      <div class="palettes">
        <palette
          class="palette"
          :steps="steps"
          :start-chroma="0"
          :end-chroma="0"
          :start-luma="startLuma"
          :end-luma="endLuma"
        ></palette>

        <palette
          v-for="(n, index) in hues"
          :key="index"
          class="palette"
          :hue="((n - 1) / hues) * 360"
          :steps="steps"
          :start-chroma="startChroma"
          :end-chroma="endChroma"
          :start-luma="startLuma"
          :end-luma="endLuma"
        ></palette>
      </div>
    </section>
  </div>
</template>

<script>
import Palette from "./components/Palette.vue";

export default {
  name: "app",
  components: {
    Palette
  },
  data() {
    return {
      darkMode: false,
      showLabels: true,

      hues: 18,
      steps: 5,
      startChroma: 30,
      endChroma: 120,
      startLuma: 90,
      endLuma: 20
    };
  },
  methods: {
    getHCL(n) {
      let c = chroma.hcl((n - 1) * 40, 20, 90);
      return c;
    }
  },

  watch: {
    darkMode() {
      const body = document.querySelector("body");
      body.classList.toggle("dark-mode");
    }
  }
};
</script>

<style>
body {
  font-family: menlo, "Courier New", Courier, monospace;
  font-size: 11px;
}
</style>

<style scoped>
.app-controls {
  font-family: var(--monospace);
  font-size: 13px;
}

.palettes {
  display: flex;
  flex-wrap: wrap;
}

.palette {
  margin: 0 16px 16px 0;
}
</style>
