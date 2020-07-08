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
  border-radius: var(--radius-sm);
  transition: transform var(--transition);
}

.stack--highlight {
  transform: scale(0.95);
}

.stack-block:first-of-type {
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
}

.stack-block:last-of-type {
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
}
</style>
