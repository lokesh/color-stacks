<template>
  <div
    class="palette"
    :class="{ 'palette--highlight': unsortedIndex === highlightHue }"
  >
    <swatch
      v-for="(step, index) in steps"
      :key="index"
      :h="hue"
      :c="startChroma + (endChroma - startChroma) * ((step - 1) / (steps - 1))"
      :l="startLuma + (endLuma - startLuma) * ((step - 1) / (steps - 1))"
      :palette-size="steps"
      class="swatch"
    ></swatch>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swatch from "./Swatch.vue";

export default {
  name: "Palette",

  components: {
    Swatch
  },

  props: {
    unsortedIndex: Number,
    steps: Number,
    hue: { type: Number, default: 0 },
    startChroma: Number,
    endChroma: Number,
    startLuma: Number,
    endLuma: Number
  },

  computed: {
    ...mapState(["highlightHue"])
  }
};
</script>

<style scoped>
.palette {
  border-radius: var(--radius);
  transition: transform var(--transition);
}

.palette--highlight {
  transform: scale(1.1);
}

.swatch:first-of-type {
  border-radius: var(--radius) var(--radius) 0 0;
}

.swatch:last-of-type {
  border-radius: 0 0 var(--radius) var(--radius);
}
</style>
