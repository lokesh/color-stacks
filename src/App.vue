<template>
  <div class='app'>
    <!-- <section>
      <control-panel/>
    </section> -->

    <!-- GRAYS -->

    <section class='gray'>
      <div class='temp'>
        Cast
      </div>
      <div class='palette-row'>
        <div class='control-col'>
          <stepper
            v-model='graySteps'
          />
          <slider
            v-model='grayLumas'
            :min='lumaMin'
            :max='lumaMax'
          ></slider>
        </div>
        <div class='palettes'>
          <palette
            class='palette'
            :steps='graySteps'
            :start-chroma='0'
            :end-chroma='0'
            :start-luma='grayLumaStart'
            :end-luma='grayLumaEnd'
          ></palette>
        </div>
      </div>
    </section>

    <!-- COLOR -->

    <section class='color'>
      <div class='temp'>
        Hue selector
      </div>
      <div class='palette-row'>
        <div class='control-col'>
          <stepper
            v-model='colorSteps'
          />
           <slider
            v-model='colorLumas'
            :min='lumaMin'
            :max='lumaMax'
          ></slider>
          <slider
            v-model='colorChromas'
            :min='chromaMin'
            :max='chromaMax'
          ></slider>
        </div>
        <div class='palettes'>
          <palette
            v-for='(hue, index) in hues'
            :key='index'
            class='palette'
            :array-index='index'
            :hue='hue'
            :steps='colorSteps'
            :start-chroma='colorChromaStart'
            :end-chroma='colorChromaEnd'
            :start-luma='colorLumaStart'
            :end-luma='colorLumaEnd'
          ></palette>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import ControlPanel from './components/ControlPanel.vue';
import Palette from './components/Palette.vue';
import Slider from './components/Slider.vue';
import Stepper from './components/Stepper.vue';

import VueSlider from 'vue-slider-component'

import 'vue-slider-component/theme/default.css'

export default {
  name: 'app',
  components: {
    ControlPanel,
    Palette,
    Stepper,
    Slider,
    VueSlider,
  },

  data() {
    return {
      // grayLumas: [0, 50],
    };
  },

  computed: {
    ...mapState([
      'lumaMin',
      'lumaMax',
      'chromaMin',
      'chromaMax',

      'grayLumaStart',
      'grayLumaEnd',

      'colorLumaStart',
      'colorLumaEnd',
      'colorChromaStart',
      'colorChromaEnd',

      'hues',
    ]),
    graySteps: {
      get() {
        return this.$store.state.graySteps;
      },
      set(val) {
        this.$store.commit('setGraySteps', val);
      },
    },
    grayLumas: {
      get() {
        return [this.grayLumaStart, this.grayLumaEnd];
      },
      set(val) {
        this.$store.commit('setGrayLumaStart', val[0]);
        this.$store.commit('setGrayLumaEnd', val[1]);        
      },
    },
    colorSteps: {
      get() {
        return this.$store.state.colorSteps;
      },
      set(val) {
        this.$store.commit('setColorSteps', val);
      },
    },
    colorLumas: {
      get() {
        return [this.colorLumaStart, this.colorLumaEnd];
      },
      set(val) {
        this.$store.commit('setColorLumaStart', val[0]);
        this.$store.commit('setColorLumaEnd', val[1]);        
      },
    },
    colorChromas: {
      get() {
        return [this.colorChromaStart, this.colorChromaEnd];
      },
      set(val) {
        this.$store.commit('setColorChromaStart', val[0]);
        this.$store.commit('setColorChromaEnd', val[1]);        
      },
    },
  },

  // methods: {
  //   getHCL(n) {
  //     // let c = chroma.hcl((n - 1) * 40, 20, 90);
  //     return c;
  //   }
  // },
  // watch: {
  //   darkMode() {
  //     const body = document.querySelector('body');
  //     body.classList.toggle('dark-mode');
  //   }
  // }
};
</script>

<style>
@import './styles/variables.css';
@import './styles/base.css';
@import './styles/vue-slider-component.css';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
}

body,
button,
input {
  color: var(--color);  
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

input[type='number'] {
  padding: 4px 8px;
  border: var(--border);
  border-radius: 3px;
}

input[type='number']:focus {
  outline: none;
  border-color: var(--focus-color);
  box-shadow: 0 0 0 1px var(--focus-color);
}
</style>

<style scoped>
.app {
  display: flex;
}

.app-output {
  flex: 1 1 auto;
  width: 100vw;
  overflow-x: scroll;
}

.palettes {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 16px;
}

.palette {
/*  margin-right: var(--palette-gap);*/
}

/* Gray section */
.gray {
  
}

.palette-row {
  display: flex;
}

</style>
