<template>
  <stack>
    <stack-block
      v-for="(color, index) in stacks.grays"
      :key="index"
      v-bind="color"
    />
  </stack>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import { Stack, StackBlock } from "./Stack";

export default {
  name: "StackGrays",

  components: {
    Stack,
    StackBlock
  },

  computed: {
    ...mapGetters(["stacks"])
  }
};
</script>
