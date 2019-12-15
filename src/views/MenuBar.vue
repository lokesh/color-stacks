<template>
  <div class="menu-bar">
    <h1 class="menu-bar__title">
      <img class="menu-bar__logo" src="../assets/logo.svg" alt="Color Stacks" />
    </h1>
    <a class="menu-bar__author" href="https://lokeshdhakar.com"
      >by Lokesh Dhakar</a
    >
    <div class="menu-bar__actions">
      <button class="button button--primary" @click="openExportModal">
        Export
      </button>
      <button class="button button" @click="reset">
        Reset
      </button>
    </div>
    <div class="control-group menu-bar__toggles">
      <label class="label label--checkbox">
        <input type="checkbox" v-model="showLabel" />
        Labels
      </label>
      <label class="label label--checkbox">
        <input type="checkbox" v-model="showHex" />
        Hex
      </label>
      <label class="label label--checkbox">
        <input type="checkbox" v-model="showContrastRatio" />
        Contrast ratio
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuBar",

  computed: {
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
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: var(--block-padding);
}

.menu-bar__logo {
  height: 48px;
}

.menu-bar__title {
  margin-bottom: 0;
}

.menu-bar__author {
  display: none;
  color: var(--color-muted);
  font-size: 13px;
  font-weight: var(--weight-bold);
  text-decoration: none;
}

.menu-bar__author:hover {
  text-decoration: underline;
}

.menu-bar .button {
  margin-left: 4px;
}

/* MOBILE */

@media (max-width: 639px) {
  .menu-bar .button {
    padding: 8px 16px;
  }

  .menu-bar__toggles {
    display: none;
  }
}

/* TABLET & DESKTOP */

@media (min-width: 640px) {
  .menu-bar {
    display: block;
  }

  .menu-bar__logo {
    width: 100%;
  }

  .menu-bar__author {
    display: block;
    margin-bottom: 12px;
  }

  .menu-bar .button {
    width: 100%;
    margin: 0 0 8px 0;
  }
}
</style>
