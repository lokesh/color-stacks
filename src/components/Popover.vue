<template>
  <div class="popover">
    <div class="popover__trigger" @click="toggle">
      <slot name="trigger" />
    </div>
    <div v-if="isOpen" class="popover__bubble" :style="bubbleStyles">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Popover",

  props: {
    width: {
      type: Number,
      default: 240
    }
  },

  data() {
    return {
      isOpen: true
    };
  },

  computed: {
    bubbleStyles() {
      return {
        width: `${this.width}px`
      };
    }
  },

  watch: {
    isOpen(val) {
      console.log(val);
    }
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.popover {
  position: relative;
}

.popover__bubble {
  position: absolute;

  /* 4 = top margin for buttons in the control col. */
  top: calc(var(--control-height) + 4);
  padding: 12px;
  background: white;
  border: var(--border-light);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  z-index: 2;
}
</style>
