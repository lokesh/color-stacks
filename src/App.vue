<template>
  <div class="app">
    <div class="body">
      <menu-bar class="app__menu-bar" />
      <div class="app__sections">
        <section-grays class="app__grays" />
        <section-color class="app__color" />
      </div>
    </div>

    <modal-backdrop v-if="modal">
      <export-modal v-if="modal === 'export'">
        EXPORT
      </export-modal>
    </modal-backdrop>
  </div>
</template>

<script>
import throttle from "lodash.throttle";
import { mapState } from "vuex";
import { paramsList } from "./utils/routing.js";
import { capitalize } from "./utils/strings.js";
import { ModalBackdrop } from "./components/Modal";
import ExportModal from "./views/ExportModal";
import MenuBar from "./views/MenuBar";
import SectionColor from "./views/SectionColor";
import SectionGrays from "./views/SectionGrays";

export default {
  name: "app",

  components: {
    ExportModal,
    MenuBar,
    ModalBackdrop,
    SectionColor,
    SectionGrays
  },

  computed: {
    ...mapState(["modal"])
  },

  mounted() {
    this.readURLParamsAndUpdateStore();
    this.checkIsMobile();
    window.addEventListener("resize", this.checkIsMobile, {
      passive: true
    });
  },

  destroyed() {
    window.removeEventListener("resize", this.checkIsMobile);
  },

  methods: {
    checkIsMobile: throttle(function() {
      this.$store.commit("setIsMobile", window.innerWidth < 640);
    }, 500),

    readURLParamsAndUpdateStore() {
      let url = new URL(document.URL);
      let params = new URLSearchParams(url.search);

      for (const [paramName, paramType] of paramsList) {
        if (params.has(paramName)) {
          let val = params.get(paramName);
          if (paramType === "number") {
            val = parseInt(val, 10);
          } else if (paramType === "array") {
            // We assume the array values need to be Numbers
            val = val
              .split(",")
              .filter(str => {
                return str.toString() !== "NaN";
              })
              .map(str => parseInt(str, 10));
            console.log(val);
          } else if (paramType === "boolean") {
            val = val === "true" ? true : false;
          }

          this.$store.commit(`set${capitalize(paramName)}`, val);
        }
      }
    }
  }
};
</script>

<style>
@import "./styles/base.css";
@import "./styles/vue-slider-component.css";
</style>

<style scoped>
.app {
  --app-menu-bar-width: 150px;
  --app-grays-width: 272px;
}
.app__menu-bar {
  border-bottom: var(--border-light);
}

.app__grays {
  border-bottom: var(--border-light);
}

.app__color {
  padding-bottom: 48px;
}

@media (min-width: 640px) {
  .app__menu-bar {
    position: fixed;
    width: var(--app-menu-bar-width);
    height: 100vh;
    overflow-y: auto;
    border-right: var(--border-light);
  }

  .app__sections {
    margin-left: var(--app-menu-bar-width);
  }

  .app__color {
    padding-bottom: var(--block-padding);
  }
}

@media (min-width: 1120px) {
  .app__sections {
    display: flex;
    min-height: 100vh;
  }

  .app__grays {
    flex: 0 0 var(--app-grays-width);
    border-bottom: none;
    border-right: var(--border-light);
  }

  .app__color {
    flex: 1 1 auto;
    overflow-x: hidden;
  }
}
</style>
