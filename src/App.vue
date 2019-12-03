<template>
  <div class="app">
    <div class="header">
      <h1>Color Stacks</h1>

      <button class="btn" @click="reset0">Reset</button>
      <!-- <button class="btn">Undo</button> -->
      <button class="btn" @click="openExportModal">Export</button>
    </div>

    <div class="body">
      <section-grays />
      <section-color />
    </div>

    <modal-export v-if="isExportModalOpen" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ModalExport from "./components/ModalExport";
import SectionColor from "./components/SectionColor";
import SectionGrays from "./components/SectionGrays";

export default {
  name: "app",

  components: {
    ModalExport,
    SectionColor,
    SectionGrays
  },

  computed: {
    ...mapState(["isExportModalOpen"])
  },

  methods: {
    openExportModal() {
      this.$store.commit("setIsExportModalOpen", true);
    },
    reset0() {
      this.$store.dispatch("resetHues", []);
    },
    reset1() {
      this.$store.dispatch("resetHues", [24, 72, 148, 260]);
    },
    reset2() {
      this.$store.dispatch("resetHues", [0, 60, 120, 180, 240, 300]);
    }
  }
};
</script>

<style>
@import "./styles/base.css";
@import "./styles/vue-slider-component.css";
</style>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: var(--border-light);
  padding: 16px;
}

.header h1,
.header h2,
.header h3,
.header h4 {
  margin-right: 16px;
  margin-bottom: 0;
}

.header .btn {
  margin-left: 4px;
}

.body {
  display: flex;
  border-bottom: var(--border-light);
  background: #ffff;
}
</style>
