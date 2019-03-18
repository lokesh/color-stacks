<template>
  <div class="app">
    <section class="app-controls">
      <control-panel/>
    </section>

    <section class="app-output">
      <div class="palettes">
        <palette
          class="palette"
          :steps="steps"
          :start-chroma="0"
          :end-chroma="0"
          :start-luma="lumaStart - 4"
          :end-luma="lumaEnd"
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

export default {
  name: "app",
  components: {
    ControlPanel,
    Palette
  },
  // data() {
  //   return {
  //     hues: 18
  //   };
  // },
  computed: {
    ...mapState([
      "hues",
      "chromaStart",
      "chromaEnd",
      "lumaStart",
      "lumaEnd",
      "steps"
    ])
  }
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
  --bg-color: #f3f3f3;

  --border-color: #d4d4d4;
  --border: 1px solid var(--border-color);

  --focus-color: #18bdff;

  --palette-gap: 16px;
  --swatch-gap: 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  color: var(--color);
  background-color: var(--bg-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 11px;
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
