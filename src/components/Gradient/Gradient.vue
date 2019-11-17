<!--
  We draw the gradient using <canvas>.
  linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%)
-->
<template>
  <div class="gradient" ref="gradient">
    <div class="bg"></div>
    <div class="hues">
      <div v-for="hue in hues" class="hue">
        {{ hue }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gradient",

  data() {
    return {
      width: null
    };
  },

  computed: {
    hues() {
      return this.$store.state.colorHues;
    }
  },

  mounted() {
    this.storeWidth();

    // TODO: Update widht on resize
  },

  methods: {
    storeWidth() {
      this.width = this.$refs.gradient.offsetWidth;
    }
  }
};
</script>

<style scoped>
.gradient-wrapper {
  position: relative;
}

.bg {
  height: 48px;
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

.hue {
  /*  position: absolute;*/
}
</style>

<!--
linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan var(--l), blue 66%, #f0f 83%, red 100%) -->
