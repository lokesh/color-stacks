<template>
  <div class="stepper">
    <button class="button button-add" @click="add">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        class="feather feather-plus"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <button class="button button-subtract" @click="subtract">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        class="feather feather-minus"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "Stepper",

  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },

  methods: {
    subtract() {
      if (this.value > this.min) {
        this.$emit("input", this.value - 1);
      }
    },
    add() {
      if (this.value < this.max) {
        this.$emit("input", this.value + 1);
      }
    }
  }
};
</script>

<style scoped>
.stepper {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.button {
  width: var(--control-height);
  height: var(--control-height);
  padding: 0;
}

.feather {
  width: var(--control-icon-size);
}

.button-add {
  border-radius: var(--radius) var(--radius) 0 0;
}

.button-subtract {
  border-top: none;
  border-radius: 0 0 var(--radius) var(--radius);
}
</style>
