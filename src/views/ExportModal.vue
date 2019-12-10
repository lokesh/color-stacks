<template>
  <modal title="Export">
    <div class="export__row">
      <div class="export__control-col">
        <div>
          <label class="label export__format-label">
            <input type="radio" name="format" value="css" v-model="format" />
            CSS variables
          </label>
          <label class="label export__format-label">
            <input type="radio" name="format" value="scss" v-model="format" />
            SCSS
          </label>
          <label class="label export__format-label">
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
    --{{ color.label }}: {{ color.hex }}; </template>
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
.export__row {
  display: grid;
  grid-template-columns: 120px auto;
  grid-column-gap: 16px;
}

.export__format-label {
  display: block;
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
</style>
