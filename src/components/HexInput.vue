<template>
  <div class="wrapper">
    <popover
      ref="popover"
      :width="144"
    >
      <template v-slot:trigger>
        <a
          v-if="!isPopoverVisible"
          class="trigger"
          @click="reset"
        >
          Add from hex&hellip;
        </a>
      </template>
      <div class="content">
        <input
          ref="input"
          v-model="hex"
          placeholder="#663399"
          class="input"
          :class="{'invalid': !isHexValid}"
          type="text"
          maxlength="7"
          @keyup.enter="addHue"
        />
        <button
          class="button"
          @click="addHue"
        >
          Add
        </button>
      </div>
    </popover>

  </div>
</template>

<script>
import Popover from './Popover';
import { hexToHCL, validateHex } from "../utils/color.js";

export default {
  name: "HexInput",

  components: {
    Popover,
  },

  data() {
    return {
      hex: '',
      isHexValid: false,
      isPopoverVisible: false,
    };
  },

  watch: {
    async isPopoverVisible(val) {
      if (val) {
        await this.$nextTick();
        this.$refs.input.focus();
      };
    },
  },

  methods: {
    addHue() {
      const val = this.$refs.input.value;
      this.isHexValid = validateHex(val);
      if (this.isHexValid) {
        const hue = Math.floor(hexToHCL(val)[0]);
        // Chroma sometimes returns NaN
        // This happens with pure grays
        if (hue) {
          this.$store.dispatch("addHue", hue);
          this.hex = '';
        }
      }
    },
    reset() {
      this.hex = '';
      this.isHexValid = true;

      setTimeout(() => {
        this.$refs.input.focus();
      }, 10)
    },
    togglePopover() {
      this.isPopoverVisible = !this.isPopoverVisible;
    },
  },
};
</script>

<style scoped>
.trigger {
  position: relative;
  top: 6px;
  color: var(--color-muted);
  cursor: pointer;

  &:hover {
    color: var(--selected-color);
  }
}

.content {
  position: relative;
}

.input {
  position: relative;
  width: 6em;
  height: 25px;
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
}

.button {
  border-left: none;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

</style>
