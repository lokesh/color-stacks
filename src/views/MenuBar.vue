<template>
  <div class="menu-bar">
    <div>
      <h1 class="menu-bar__title">
        <img
          class="menu-bar__logo"
          src="../assets/logo.svg"
          alt="Color Stacks"
        />
      </h1>

      <credits class="menu-bar__credits-mobile" />

      <div class="menu-bar__actions">
        <button class="button" @click="openExportModal">
          Export
        </button>
        <button class="button" @click="reset">
          Reset
        </button>
      </div>

      <div class="control-group menu-bar__toggles">
        <label class="label label--checkbox">
          <toggle v-model="showLabel" />
          Labels
        </label>
        <label class="label label--checkbox">
          <toggle v-model="showHex" />
          Hex
        </label>
        <label class="label label--checkbox">
          <toggle v-model="showContrastRatio" />
          Contrast ratio
        </label>
        <label class="label label--checkbox">
          <toggle v-model="darkMode" />
          Dark mode
        </label>

      </div>
    </div>
    <credits class="menu-bar__credits-desktop" />
  </div>
</template>

<script>
import Credits from "./Credits";
import Toggle from "../components/Toggle";

export default {
  name: "MenuBar",

  components: {
    Credits,
    Toggle,
  },

  computed: {
    darkMode: {
      get() {
        return this.$store.state.darkMode;
      },
      set(val) {
        this.$store.commit("setDarkMode", val);
      }
    },
    showLabel: {
      get() {
        return this.$store.state.showLabel;
      },
      set(val) {
        this.$store.commit("setShowLabel", val);
      }
    },
    showHex: {
      get() {
        return this.$store.state.showHex;
      },
      set(val) {
        this.$store.commit("setShowHex", val);
      }
    },
    showContrastRatio: {
      get() {
        return this.$store.state.showContrastRatio;
      },
      set(val) {
        this.$store.commit("setShowContrastRatio", val);
      }
    }
  },

  watch: {
    darkMode: {
      immediate: true,
      handler: (val) => {
        document.getElementsByTagName('body')[0].classList.toggle('dark-mode', val);
      },
    },
  },

  methods: {
    openExportModal() {
      this.$store.commit("openModal", "export");
    },
    reset() {
      this.$store.dispatch("reset");
    }
  }
};
</script>

<style scoped>
.menu-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--bg-color-menu-bar);
  padding: var(--block-padding);
}

.menu-bar__logo {
  height: 64px;
}

.menu-bar__title {
  margin-bottom: 20px;
}

.menu-bar__toggles {
  display: none;
}

.menu-bar__credits-desktop {
  display: none;
}

.menu-bar__credits-mobile {
  margin-bottom: 8px;
  font-size: var(--font-size-lg);
}

.menu-bar__actions {
  margin-bottom: 8px;
}

.menu-bar .button {
  margin-left: 4px;
  text-align: left;
  padding: 8px 12px;
}

.menu-bar .button:first-of-type {
  margin-left: 0;
}

/* MOBILE */

@media (max-width: 639px) {
  .menu-bar .button {
    padding: 8px 16px;
  }
}

/* TABLET & DESKTOP */

@media (min-width: 640px) {
  .menu-bar {
    align-items: center;
  }

  .menu-bar__logo {
    width: 100%;
    height: auto;
  }

  .menu-bar__subtitle {
    font-size: var(--font-size);
    margin-bottom: 24px;
  }

  .menu-bar__toggles {
    display: block;
  }

  .menu-bar__credits-mobile {
    display: none;
  }

  .menu-bar__credits-desktop {
    display: block;
  }

  .menu-bar .button {
    width: 100%;
    margin: 0 0 8px 0;
  }
}
</style>
