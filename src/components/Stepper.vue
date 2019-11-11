<template>
  <div class="stepper">
    <button class="button button-substract">-</button>
    <button class="button button-add">+</button>
  </div>
</template>

<script>
export default {
  name: "Stepper",
  props: {
    variable: String,
  },
  computed: {
    value: {
      get() {
        return 0;
      },
      set(val) {

      },
    },
  },
};
</script>


<style scoped>
.button {
  padding: 24px;
  border: var(--border);
  border-radius: var(--radius);
}
</style>
