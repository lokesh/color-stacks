<template>
  <section class="section-export">
    <h2>Export</h2>
    <!-- {{ stacks.colors }} -->
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Grays",

  computed: {
    ...mapGetters(["stacks"])
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
