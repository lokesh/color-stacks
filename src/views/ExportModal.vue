<template>
  <modal>
    {{ stacks }}
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
  }
};
</script>

<style scoped></style>
