<template>
  <div class="palette">
    <!-- <input
      type="number"
      class="hue-input"
      :min="hueMin"
      :max="hueMax"
      v-model.number="hueInput"
      @keydown.shift="onKeydownWithShift"
    > -->
    <swatch
      v-for="(step, index) in steps"
      :key="index"
      :h="hue"
      :c="startChroma + (endChroma - startChroma) * ((step - 1) / (steps - 1))"
      :l="startLuma + (endLuma - startLuma) * ((step - 1) / (steps - 1))"
      :palette-size="steps"
      class="swatch"
    ></swatch>

    <button v-if="false" class="remove-btn" type="button" @click="remove">
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
  name: "palette",
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
      hueInput: this.hue
    };
  },
  computed: {
    ...mapState(["hueMin", "hueMax"])
  },
  watch: {
    hueInput(val) {
      this.$store.commit("updateHue", {
        index: this.arrayIndex,
        hue: val
      });
    }
  },

  methods: {
    onKeydownWithShift(event) {
      if (event.key === "ArrowUp") {
        this.hueInput += 10;
        if (this.hueInput > this.hueMax) {
          this.hueInput = this.hueMax;
        }
        event.preventDefault();
      } else if (event.key === "ArrowDown") {
        this.hueInput -= 10;
        if (this.hueInput < this.hueMin) {
          this.hueInput = this.hueMin;
        }
        event.preventDefault();
      }
    },
    remove() {
      this.$store.commit("removeHue", this.arrayIndex);
    }
  }
};
</script>

<style scoped>
.swatch:first-of-type {
  border-radius: var(--radius) var(--radius) 0 0;
}

.swatch:last-of-type {
  border-radius: 0 0 var(--radius) var(--radius);
}

.remove-btn {
  width: var(--control-height);
  height: var(--control-height);
}
.feather {
  width: var(--control-icon-size);
}
</style>
