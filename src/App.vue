<template>
  <div class="app">
    <div class="header">
      <h1>Color Stacks</h1>

      <button class="btn" @click="reset0">
        Reset
      </button>
      <!-- <button class="btn">Undo</button> -->
      <button class="btn" @click="openExportModal">Export</button>
    </div>

    <div class="body">
      <section-grays />
      <section-color />
    </div>

    <modal-backdrop v-if="modal">
      <export-modal v-if="modal === 'export'">
        EXPORT
      </export-modal>
    </modal-backdrop>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ModalBackdrop } from "./components/Modal";
import ExportModal from "./views/ExportModal";
import SectionColor from "./views/SectionColor";
import SectionGrays from "./views/SectionGrays";

export default {
  name: "app",

  components: {
    ExportModal,
    ModalBackdrop,
    SectionColor,
    SectionGrays
  },

  computed: {
    ...mapState(["modal"])
  },

  methods: {
    openExportModal() {
      this.$store.commit("openModal", "export");
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
