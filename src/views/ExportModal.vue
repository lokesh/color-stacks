<template>
  <modal>
    <pre contentEditable="true">
:root {
<template v-for="color in flatList">  --{{ color.label }}: {{ color.hex }};
</template></pre>
    }
  </modal>
</template>

<script>
import { Modal } from "../components/Modal";
export default {
  name: "ExportModal",

  components: {
    Modal
  },

  data() {
    return {
      stacks: null
    };
  },

  mounted() {
    this.stacks = this.$store.getters.stacks;
  },

  computed: {
    flatList() {
      if (!this.stacks) return "";

      const graysFlat = this.stacks.grays;
      const colorsFlat = this.stacks.colors
        .map(hue => {
          return [...hue.colors];
        })
        .flat();

      return graysFlat.concat(colorsFlat);
    }
  }
};
</script>

<style scoped></style>
