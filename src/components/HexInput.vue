<template>
  <div>
    <a
      v-if="!inputVisible"
      class="add-button"
      @click="inputVisible = !inputVisible"
    >
      Add from hex&hellip;
    </a>

    <div
      v-else
      class="control"
    >
      <input
        ref="input"
        v-model="hex"
        placeholder="#663399"
        class="input"
        type="text"
        maxlength="6"
        @keyup.enter="onEnter"
      />
      <br /><br />
    </div>

  </div>
</template>

<script>
import { hexToHCL, validateHex } from "../utils/color.js";

export default {
  name: "HexInput",

  data() {
    return {
      hex: '',
      inputVisible: false,
    };
  },

  watch: {
    async inputVisible(val) {
      if (val) {
        await this.$nextTick();
        this.$refs.input.focus();
      };
    },
  },

  methods: {
    onEnter(e) {
      const val = e.target.value;
      if (validateHex(val)) {
        const hue = Math.floor(hexToHCL(val)[0]);
        // Chroma sometimes returns NaN
        // This happens with pure grays
        if (hue) {
          this.$store.dispatch("addHue", hue);
        }
      }
    },
  },
};
</script>

<style scoped>
.add-button {
  position: relative;
  top: 6px;
  color: var(--color-muted);
  cursor: pointer;

  &:hover {
    color: var(--selected-color);
  }
}

.control {
  display: flex;
}

/*.prefix {
  text-align: center;
  width: 24px;
  height: var(--control-height);
  border: var(--control-border);
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
  border-right: none;
  line-height: var(--control-height);
}
*/
.input {
/*  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;*/
  width: 6em;
}

</style>
