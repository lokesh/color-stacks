<template>
  <div class="handle" v-dragged="onDragged"></div>
</template>

<script>
export default {
  name: "SpectrumHandle",

  inject: ["spectrum"],

  computed: {
    xMin() {
      return this.spectrum.left;
    },
    xMax() {
      return this.spectrum.right;
    }
  },
  methods: {
    onDragged({
      el,
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      clientX,
      clientY,
      first,
      last
    }) {
      if (first) {
        this.isDragging = true;
        return;
      }
      if (last) {
        this.isDragging = false;
        return;
      }
      var l = +window.getComputedStyle(el)["left"].slice(0, -2) || 0;
      var t = +window.getComputedStyle(el)["top"].slice(0, -2) || 0;
      el.style.left = l + deltaX + "px";
      // el.style.top = t + deltaY + "px";
    }
  }
};
</script>

<style scoped>
.handle {
  position: absolute;
  width: 16px;
  height: calc(var(--spectrum-height) + var(--spectrum-handle-overhang) * 2);
  background: white;
  border: var(--border);
  border-radius: var(--radius-sm);
}
</style>
