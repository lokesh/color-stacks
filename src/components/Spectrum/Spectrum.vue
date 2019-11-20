<template>
  <div class="wrapper">
    <div class="spectrum" ref="spectrum" @click="onSpectrumClick"></div>
    <div class="hues">
      <div
        v-for="(hue, index) in hues"
        :key="`hue-${index}`"
        class="hue"
        :style="getHueStyles(hue)"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        v-dragged="onDragged"
      >
        <div class="hue-handle"></div>
        <div class="hue-input">
          {{ hue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Spectrum",

  data() {
    return {
      isDragging: false,
      width: 640
      // spectrumDOMRect: null
    };
  },

  computed: {
    hues() {
      return this.$store.state.colorHues;
    }
  },

  mounted() {
    // this.storeSpectrumDimensions();
    // HACK
    // this.$refs.spectrum.click();
    // this.positionHues();
    // TODO: Update width on resize
  },

  methods: {
    addHue(hue) {
      // console.log(hue);
      this.$store.dispatch("addHue", hue);
    },
    getHueStyles(hue) {
      let x = (hue / 360) * this.width;
      return {
        transform: `translateX(${x}px)`
      };
    },
    onPointerDown(e) {
      console.log("down");
    },
    onPointerMove(e) {
      console.log("move");
    },
    onPointerUp(e) {
      console.log("up");
    },
    onSpectrumClick(e) {
      this.addHue(Math.floor((e.layerX / this.width) * 360));
    },
    storeSpectrumDimensions() {
      // this.spectrumDimensions = this.$refs.spectrum.getBoundingClientRect();
      // this.width = this.$refs.spectrum.getBoundingClientRect().width
    },
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
      el.style.top = t + deltaY + "px";
    }
  }
};
</script>

<style scoped>
.wrapper {
  --spectrum-height: 48px;
  --handle-overhang: 3px;

  position: relative;
}

.spectrum {
  height: var(--spectrum-height);
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

.hues {
  padding-bottom: 36px;
}

.hue {
  position: absolute;
  top: calc(var(--handle-overhang) * -1);
}

.hue-handle {
  width: 12px;
  height: calc(var(--spectrum-height) + var(--handle-overhang) * 2);
  background: white;
  border: var(--border);
  border-radius: var(--radius-sm);
}
</style>
