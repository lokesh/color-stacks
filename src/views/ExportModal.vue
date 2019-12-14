<template>
  <modal title="Export">
    <div class="export__row">
      <div class="export__controls">
        <div>
          <label class="label label--radio">
            <input type="radio" name="format" value="css" v-model="format" />
            CSS
          </label>
          <label class="label label--radio">
            <input type="radio" name="format" value="scss" v-model="format" />
            SCSS
          </label>
          <label class="label label--radio">
            <input type="radio" name="format" value="json" v-model="format" />
            JSON
          </label>
        </div>
      </div>
      <div class="export__code-col">
        <pre
          v-if="format === 'css'"
          class="export__code"
          contentEditable="true"
        >:root {<template v-for="color in flatList">
    --{{ color.label }}: {{ color.hex }};</template>
}</pre>
        <pre
          v-if="format === 'scss'"
          class="export__code"
          contentEditable="true"
        ><template v-for="color in flatList">${{ color.label }}: {{ color.hex }};
</template></pre>
        <pre
          v-if="format === 'json'"
          class="export__code"
          contentEditable="true"
          >{{ stacks }}</pre
        >
      </div>
    </div>
  </modal>
</template>

<script>
import { Modal } from "../components/Modal";
export default {
  name: "ExportModal",

  components: {
    Modal
  },

  data() {
    return {
      format: "css",
      stacks: null
    };
  },

  mounted() {
    this.stacks = this.$store.getters.stacks;
  },

  computed: {
    flatList() {
      if (!this.stacks) return "";

      const graysFlat = this.stacks.grays;
      const colorsFlat = this.stacks.colors
        .map(hue => {
          return [...hue.colors];
        })
        .flat();

      return graysFlat.concat(colorsFlat);
    }
  }
};
</script>

<style scoped>
.export__controls {
  margin-bottom: var(--block-padding);
}

.export__code {
  height: 100%;
  padding: 8px;
  font-size: 12px;
  font-family: Menlo, monospace;
  line-height: 1.4em;
  background: var(--bg-color-light);
  border-radius: var(--radius-sm);
}

@media (min-width: 640px) {
  .export__row {
    display: grid;
    grid-template-columns: 124px auto;
    grid-column-gap: var(--block-padding);
  }
}
</style>
