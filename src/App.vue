<template>
  <div class="app">
    <banner class="app__banner" />
    <section-grays class="app__grays" />
    <section-color class="app__color" />

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
import Banner from "./views/Banner";
import SectionColor from "./views/SectionColor";
import SectionGrays from "./views/SectionGrays";

export default {
  name: "app",

  components: {
    Banner,
    ExportModal,
    ModalBackdrop,
    SectionColor,
    SectionGrays
  },

  computed: {
    ...mapState(["modal"])
  },

  mounted() {
    this.checkIsMobile();
    window.addEventListener("resize", this.checkIsMobile, {
      passive: true
    });
  },

  destroyed() {
    window.removeEventListener("resize", this.checkIsMobile);
  },

  methods: {
    checkIsMobile() {
      this.$store.commit("setIsMobile", window.innerWidth < 640);
    }
  }
};
</script>

<style>
@import "./styles/base.css";
@import "./styles/vue-slider-component.css";
</style>

<style scoped>
.app__banner {
  border-bottom: var(--border-light);
}

.app__grays {
  border-bottom: var(--border-light);
}

@media (min-width: 640px) {
  .body {
    /*    background: beige;*/
  }
}

@media (min-width: 1240px) {
  .body {
    /* background: gold;*/
  }
}
</style>
