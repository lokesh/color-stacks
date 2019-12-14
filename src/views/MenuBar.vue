<template>
  <div class="menu-bar">
    <h1 class="menu-bar__title">Color Stacks</h1>

    <div class="menu-bar__actions">
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
  name: "MenuBar",

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
.menu-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: var(--block-padding);
}

.menu-bar__title {
  margin-bottom: 0;
}

.menu-bar .btn {
  margin-left: 4px;
}

@media (max-width: 639px) {
  .menu-bar .btn {
    padding: 8px 16px;
  }
}

@media (min-width: 640px) {
  .menu-bar {
    display: block;
    /*flex-direction: column;
    justify-content: flex-start;*/
  }
  .menu-bar__title {
    margin-bottom: 8px;
  }

  .menu-bar .btn {
    width: 100%;
    margin: 0 0 8px 0;
  }
}
</style>
