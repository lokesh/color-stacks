<template>
  <div class="color-stacks">
    <stack
      v-for="(hue, index) in stacks.colors"
      :key="`hue-${index}`"
      :unsorted-index="hue.unsortedIndex"
      class="color-stack"
    >
      <stack-block
        v-for="(color, index) in hue.colors"
        :key="`block-${hue}-${index}`"
        v-bind="color"
      />
    </stack>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { Stack, StackBlock } from "../components/Stack";

export default {
  name: "ColorStacks",

  components: {
    Stack,
    StackBlock
  },

  computed: {
    ...mapGetters(["stacks"])
  }
};
</script>

<style scoped>
.color-stacks {
  display: flex;
  flex-wrap: nowrap;
}

.color-stack {
  margin-right: var(--stack-gap);
}

.color-stack:last-of-type {
  margin-right: 0;
}
</style>
