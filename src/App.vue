<template>
  <div class="app">
    <section class="app-controls">
      <control-panel/>Hues (Columns):
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
          v-for="(n, index) in hues"
          :key="index"
          class="palette"
          :hue="((n - 1) / hues) * 360"
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
  data() {
    return {
      hues: 18
    };
  },
  computed: {
    ...mapState(["chromaStart", "chromaEnd", "lumaStart", "lumaEnd", "steps"])
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
  --bg-color: #fff;

  --border-color: #d4d4d4;
  --border: 1px solid var(--border-color);

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
  font-family: menlo, "Courier New", Courier, monospace;
  font-size: 11px;
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
