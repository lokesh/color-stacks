<template>
  <div class="popover">
    <div class="popover__trigger" @click.stop="toggle">
      <slot name="trigger" />
    </div>
    <div
      v-if="isOpen"
      class="popover__bubble"
      :style="bubbleStyles"
      @click.stop
    >
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
      default: null,
    }
  },

  data() {
    return {
      isOpen: false
    };
  },

  computed: {
    bubbleStyles() {
      return {
        width: this.width ? `${this.width}px` : 'auto',
      };
    }
  },

  watch: {
    isOpen(val) {
      if (val) {
        this.addDocumentListeners();
      } else {
        this.removeDocumentListeners();
      }
    }
  },

  methods: {
    addDocumentListeners() {
      document.addEventListener("click", this.close);
    },
    close() {
      this.isOpen = false;
    },
    removeDocumentListeners() {
      document.addEventListener("click", this.close);
    },
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
  /*top: calc(var(--control-height) + 4);*/
  top: 0;
  left: 0;
  padding: 12px;
  background: white;
  border: var(--border-light);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  z-index: 1;
}
</style>
