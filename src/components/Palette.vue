<template>
  <div class="palette">
    <input
      type="number"
      class="hue-input"
      :min="hueMin"
      :max="hueMax"
      v-model.number="hueInput"
      @keydown.shift="onKeydownWithShift"
    >
    <br>
    <button type="button" @click="remove">Remove</button>
    <swatch
      v-for="(step, index) in steps"
      :key="index"
      :h="hue"
      :c="startChroma + ((endChroma - startChroma)  * ((step - 1) / (steps - 1)))"
      :l="startLuma + ((endLuma - startLuma) * ((step - 1) / (steps - 1)))"
      :palette-size="steps"
    ></swatch>
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
.hue-input {
  width: 6em;
}
</style>
