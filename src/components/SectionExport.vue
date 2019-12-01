<template>
  <section class="section-export">
    <h2>Export</h2>
    <div class="palette-row"></div>
  </section>
</template>

<script>
import { mapState } from "vuex";

import Palette from "./Palette.vue";
import Slider from "./Slider.vue";

export default {
  name: "Grays",

  components: {
    Palette,
    Slider
  },

  computed: {
    ...mapState(["graySteps", "grayCast"])
  }
};
</script>

<style scoped>
.section-export {
  padding: 16px;
  background: white;
  border-bottom: var(--border-light);
}
</style>
