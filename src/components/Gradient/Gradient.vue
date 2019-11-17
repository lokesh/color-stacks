<!--
  We draw the gradient using <canvas>.
  linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%)
-->
<template>
  <div>
    <div class="gradient-wrapper">
      <canvas class="gradient" ref="canvas" />
    </div>
    <div class="gradient2"></div>
  </div>
</template>

<script>
export default {
  name: "Gradient",

  data() {
    return {
      canvas: null,
      width: null,
      height: null,
      ctx: null
    };
  },

  mounted() {
    this.initCanvas();
    this.drawGradient();
  },

  methods: {
    initCanvas() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");

      this.width = this.canvas.parentElement.offsetWidth;
      this.height = this.canvas.parentElement.offsetHeight;

      this.canvas.style.width = this.width + "px";
      this.canvas.style.height = this.height + "px";

      // Set actual size in memory (scaled to account for extra pixel density).
      let scale = window.devicePixelRatio; // <--- Change to 1 on retina screens to see

      // Normalize coordinate system to use css pixels.
      this.ctx.scale(scale, scale);
      this.width *= scale;
      this.height *= scale;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    },
    drawGradient() {
      const hueWidth = this.width / 360;

      for (let hue = 0, x = 0, prevX, startX, endX; hue < 360; hue++) {
        startX = prevX;
        endX = Math.round(x + hueWidth);

        this.ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        this.ctx.fillRect(startX, 0, endX, this.height);

        prevX = endX;
        x = x + hueWidth;
      }
    }
  }
};
</script>

<style scoped>
.gradient-wrapper {
  height: 64px;
  margin-bottom: 16px;
}

.gradient {
  display: block;
  border-radius: var(--radius);
}

.gradient2 {
  --s: 100%;
  --l: 50%;

  /*width: 360px;*/
  height: 48px;
  /*  background: red;*/
  background: linear-gradient(
    to right,
    red 0%,
    #ff0 17%,
    lime 33%,
    cyan 50%,
    blue 66%,
    #f0f 83%,
    red 100%
  );
  border-radius: var(--radius);
}
</style>

<!--
linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan var(--l), blue 66%, #f0f 83%, red 100%) -->
