<template>
  <vue-slider
    class="slider"
    v-bind="$attrs"
    direction="ttb"
    :duration="0"
    :dot-size="[24, 12]"
    :height="100"
    @change="val => $emit('input', val)"
  />
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  name: "Slider",

  components: {
    VueSlider
  }
};
</script>

<style scoped>
.slider {
  margin-bottom: 16px;
}
</style>
