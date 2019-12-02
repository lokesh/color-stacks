<template>
  <section class="section-export">
    <h2>Export</h2>
    {{ stacks }}
    <div class="palette-row"></div>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import Palette from "./Palette.vue";
import Slider from "./Slider.vue";

export default {
  name: "Grays",

  components: {
    Palette,
    Slider
  },

  computed: {
    ...mapGetters(["stacks"]),
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
