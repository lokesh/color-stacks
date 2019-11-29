<template>
  <div class="palette" :class="{ 'palette--highlight': hasHueRecentlyChanged }">
    <swatch
      v-for="(step, index) in steps"
      :key="index"
      :h="hue"
      :c="startChroma + (endChroma - startChroma) * ((step - 1) / (steps - 1))"
      :l="startLuma + (endLuma - startLuma) * ((step - 1) / (steps - 1))"
      :palette-size="steps"
      class="swatch"
    ></swatch>

    <button class="btn remove-btn" type="button" @click="remove">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        class="feather feather-x"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swatch from "./Swatch.vue";

export default {
  name: "Palette",

  components: {
    Swatch
  },

  props: {
    arrayIndex: Number,
    steps: Number,
    hue: { type: Number, default: 0 },
    startChroma: Number,
    endChroma: Number,
    startLuma: Number,
    endLuma: Number
  },

  data() {
    return {
      hasHueRecentlyChanged: false,
      hueChangeTimeout: null
    };
  },

  watch: {
    hue() {
      clearTimeout(this.huseChangeTimeout);
      this.hueChangeTimeout = setTimeout(() => {
        this.hasHueRecentlyChanged = false;
      }, 1500);
      this.hasHueRecentlyChanged = true;
    }
  },

  methods: {
    remove() {
      this.$store.commit("removeHue", this.arrayIndex);
    }
  }
};
</script>

<style scoped>
.palette {
  border-radius: var(--radius);
  transition: transform var(--transition);
}

.palette--highlight {
  /*box-shadow: 0 0 0 4px var(--selected-color);*/
  transform: scale(1.05);
}

.swatch:first-of-type {
  border-radius: var(--radius) var(--radius) 0 0;
}

.swatch:last-of-type {
  border-radius: 0 0 var(--radius) var(--radius);
}

.remove-btn {
  /*  width: var(--control-height);
  height: var(--control-height);*/
}
.feather {
  width: var(--control-icon-size);
}
</style>
