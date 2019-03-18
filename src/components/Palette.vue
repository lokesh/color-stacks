<template>
  <div class="palette">
    <input :value="hue" style="width: 100%">
    <br>
    <button label="delete" type="button"/>
    <swatch
      v-for="(step, index) in steps"
      :key="index"
      :h="hue"
      :c="startChroma + ((endChroma - startChroma)  * ((step - 1) / (steps - 1)))"
      :l="startLuma + ((endLuma - startLuma) * ((step - 1) / (steps - 1)))"
      :palette-size="steps"
    ></swatch>
  </div>
</template>

<script>
import Swatch from "./Swatch.vue";

export default {
  name: "palette",
  components: {
    Swatch
  },
  props: {
    steps: { type: Number, default: 10 },
    hue: { type: Number, default: 0 },
    startChroma: { type: Number, default: 60 },
    endChroma: { type: Number, default: 60 },
    startLuma: { type: Number, default: 20 },
    endLuma: { type: Number, default: 120 }
  }
};
</script>

<style scoped>
</style>
