<template>
  <div class="banner">
    <h1 class="banner__title">Color Stacks</h1>

    <div class="banner__actions">
      <button class="btn" @click="reset">
        Reset
      </button>
      <!-- <button class="btn">Undo</button> -->
      <button class="btn" @click="openExportModal">Export</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",

  methods: {
    openExportModal() {
      this.$store.commit("openModal", "export");
    },
    reset() {
      this.$store.dispatch("resetHues", []);
    }
  }
};
</script>

<style scoped>
.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: var(--block-padding);
}

.banner__title {
  margin-right: 16px;
  margin-bottom: 0;
}

.banner .btn {
  margin-left: 4px;
}
</style>
