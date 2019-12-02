<template>
  <div
    class="stack"
    :class="{ 'stack--highlight': unsortedIndex === highlightHue }"
  >
    <slot />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Palette",

  props: {
    unsortedIndex: Number
  },

  computed: {
    ...mapState(["highlightHue"])
  }
};
</script>

<style scoped>
.stack {
  border-radius: var(--radius);
  transition: transform var(--transition);
}

.stack--highlight {
  transform: scale(1.1);
}

.stack-block:first-of-type {
  border-radius: var(--radius) var(--radius) 0 0;
}

.stack-block:last-of-type {
  border-radius: 0 0 var(--radius) var(--radius);
}
</style>
