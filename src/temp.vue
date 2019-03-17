---
title: "Design Systems: Exploring HCL color space"
date: 2019-03-09
layout: post.njk
---

<b>This post is a work-in-progress.</b>


<!-- However, their luminance variation does not match the way humans perceive color.
      Perceptually uniform color spaces outperform RFB in cases such as high noise environments. The
      Lab color space does correspond to the three channels of human perceptions, but it has poor
      hue constancy, especially in the blue range. hcl -->

<div
  id="app"
  :class="{'hide-labels': !showLabels}"
>


  <section class="app-controls">
    Hues (Columns): <input type="range" min="1" max="18" step="1" v-model.number="hues">{{ hues }}<br>
    Steps (Rows): <input type="range" min="1" max="20" step="1" v-model.number="steps">{{ steps }}<br>
    Start Chroma: <input type="range" min="1" max="150" v-model.number="startChroma">{{ startChroma }}<br>
    End Chroma: <input type="range" min="1" max="150" v-model.number="endChroma">{{ endChroma }}<br>
    Start luminance: <input type="range" min="1" max="150" v-model.number="startLuma"> {{ startLuma }} <br>
    End luminance: <input type="range" min="1" max="150" v-model.number="endLuma">{{ endLuma }}<br>
    <label class="checkbox-label">
      Show swatch labels: <input type="checkbox" v-model="showLabels" class="checkbox" /><br>
    </label>
    <label class="checkbox-label">
      Dark mode: <input type="checkbox" v-model="darkMode" class="checkbox" /><br>
    </label>
  </section>
  <br>

  <section>
    <div class="palettes">
      <palette
        class="palette"
        :steps="steps"
        :start-chroma="0"
        :end-chroma="0"
        :start-luma="startLuma"
        :end-luma="endLuma"
      >
      </palette>

      <palette
        v-for="n in hues"
        class="palette"
        :hue="((n - 1) / hues) * 360"
        :steps="steps"
        :start-chroma="startChroma"
        :end-chroma="endChroma"
        :start-luma="startLuma"
        :end-luma="endLuma"
      >
      </palette>
    </div>
  </section>

  <div>

    <h2>HSL</h2>

    <section class="notices">

      <notice
        v-for="n in 8"
        :style="`background: hsl(${(n - 1) * 40}, 100%, 90%)`"
      >
        HCL is designed to have characteristics of oth culinrical transslations of the
        RGB color space, asuch as HSL and HSC, and the Lab color space. hsl

      </notice>
    </section>

    <h2>HCL</h2>

    <section class="notices">
      <notice
        v-for="n in 8"
        :style="`background: ${getHCL(n)}`"
      >
        The HSL and HSC color spaces ar emore intuitive translations of the RGB color space, because
        they provide a single hue number. hcl
      </notice>
    </section>

    <p>HSL vs HCL. Hue adjustments maintain more consistent perceptual lightness with HCL.</p>
  </div>

</div>


<script type="text/x-template" id="tpl-swatch">
  <div
    class="swatch"
    :class="{
      'clipped': clipped,
      'not-compliant': !aaCompliant
    }"
    :style="`
      background: ${backgroundColor};
      color: ${color}
    `"
  >
    <div class="swatch-label">
      <div class="swatch-name">{{ name }}</div>
      <div class="swatch-hex">{{ backgroundColor }}</div>
      <div class="swatch-wcag" v-if="!aaCompliant">
        WCAG {{ Math.round(wcag * 100) / 100 }}
      </div>
    </div>
  </div>
</script>

<script type="text/x-template" id="tpl-palette">
  <div>
    <swatch
      v-for="step in steps"
      :h="hue"
      :c="startChroma + ((endChroma - startChroma)  * ((step - 1) / (steps - 1)))"
      :l="startLuma + ((endLuma - startLuma) * ((step - 1) / (steps - 1)))"
      :palette-size="steps"
    >
    </swatch>
  </div>
</script>


<script type="text/x-template" id="tpl-notice">
  <div class="notice">
    <slot />
  </div>
</script>


<script src="/js/vue.min.js"></script>
<script src="/js/chroma.min.js"></script>

<script>
Vue.component('notice', {
  template: '#tpl-notice',
});


Vue.component('swatch', {
  template: '#tpl-swatch',
  props: {
    h: { type: Number, required: true },
    c: { type: Number, required: true },
    l: { type: Number, required: true },
    paletteSize: { type: Number },
  },
  data() {
    return {
      chromaVal: null,
      clipped: false,
    };
  },
  computed: {
    color() {
      return (this.l < 50) ? '#ffffff' : '#000000';
    },
    backgroundColor() {
      let c = chroma.hcl(this.h, this.c, this.l);
      // this.superClipped = c._rgb._unclipped.some((val) => val > 500 || val < -500);
      this.clipped =  c.clipped();
      return c.hex();
    },
    name() {
      // 0 = red, 120 = green, blue = 240,
      let label;
      if (this.c === 0) {
        label = 'gray';
      } else if (this.h < 20) {
        label = 'pink';
      } else if (this.h < 40) {
        label = 'rose';
      } else if (this.h < 60) {
        label = 'red';
      } else if (this.h < 80) {
        label = 'orange';
      } else if (this.h < 100) {
        label = 'brown';
      } else if (this.h < 120) {
        label = 'olive';
      } else if (this.h < 140) {
        label =  'forest';
      } else if (this.h < 160) {
        label =  'green';
      } else if (this.h < 180) {
        label =  'teal';
      } else if (this.h < 200) {
        label =  'mint';
      } else if (this.h < 220) {
        label =  'turqouise';
      } else if (this.h < 240) {
        label =  'baby-blue';
      } else if (this.h < 260) {
        label =  'powder-blue';
      } else if (this.h < 280) {
        label =  'blue';
      } else if (this.h < 300) {
        label =  'cobalt';
      } else if (this.h < 320) {
        label =  'indigo';
      } else if (this.h < 340) {
        label =  'purple';
      } else if (this.h < 360) {
        label =  'plum';
      }


      label += `-${100 - Math.ceil(((this.l / 150) * 100) / 5) *  5}`;

      return label;
      // return this.backgroundColor;
    },
    wcag() {
        return chroma.contrast(this.color, this.backgroundColor);
    },
    aaCompliant() {
      return this.wcag >= 4.51;
    }

  },

});

Vue.component('palette', {
  template: '#tpl-palette',
  props: {
    steps: { type: Number, default: 10 },
    hue: { type: Number, default: 0 },
    startChroma: { type: Number, default: 60 },
    endChroma: { type: Number, default: 60 },
    startLuma: { type: Number, default: 20 },
    endLuma: { type: Number,  default: 120 },
  },
});

new Vue({
  el: '#app',
  data() {
    return {
      darkMode: false,
      showLabels: true,

      hues: 18,
      steps: 5,
      startChroma: 30,
      endChroma: 120,
      startLuma: 90,
      endLuma: 20,
    };
  },

  methods: {
    getHCL(n) {
      let c = chroma.hcl(((n - 1) * 40), 20, 90);
      return c;
    },
  },

  watch: {
    darkMode(val) {
      const body = document.querySelector('body');
      body.classList.toggle('dark-mode');
    }
  }
});
</script>

<link rel="stylesheet" href="/css/forms.css">

<style>
.app-controls {
  font-family: var(--monospace);
  font-size: 13px;
}

.palettes {
  display: flex;
  flex-wrap: wrap;
}

.palette {
  margin: 0 16px 16px 0;
}

.swatch {
  position: relative;
  width: 6rem;
  height: 2.5rem;
  padding: 8px;
  border-radius: var(--border-radius);
  font-size: 11px;
  font-family: var(--monospace);
}

.swatch-name {
  font-weight: 600;
}

.hide-labels .swatch-label {
  display: none;
}

.not-compliant::after {
  position: absolute;
  content: 'AA';
  right: 8px;
  top: calc(50% - 5px);
  opacity: 0.85;
  padding: 0 2px;
  color: black;
  background: #fff;
  border-radius: 2px;
  text-decoration: line-through;
}

.notices {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.notice {
  width: 18rem;
  color: black;
  font-size: 0.75rem;
  padding: 16px;
  margin: 0 16px 16px 0;
  border-radius: 4px;
}
</style>
