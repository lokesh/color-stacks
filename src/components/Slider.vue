<template>
  <div>
    <label v-if="label" class="label">{{ label }}</label>
    <!-- :dot-size="[24, 12]"  -->
    <vue-slider
      class="slider"
      v-bind="$attrs"
      :direction="directionVal"
      :duration="0"
      :dot-size="[size, size]"
      :height="height"
      @change="val => $emit('input', val)"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  name: "Slider",

  components: {
    VueSlider
  },

  props: {
    label: {
      type: String,
      required: false
    },
    direction: {
      type: String,
      default: "horizontal"
    }
  },

  computed: {
    ...mapState(["isMobile"]),
    directionVal() {
      // return "ttb";
      return this.direction === "horizontal" ? "ltr" : "ttb ";
    },
    height() {
      return this.direction === "horizontal" ? null : "100";
    },
    size() {
      return this.isMobile ? 24 : 16;
    }
  }
};
</script>
