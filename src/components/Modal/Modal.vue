<template>
  <div class="modal" @click.stop>
    <h1 v-if="title">
      {{ title }}
    </h1>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Modal",

  props: {
    title: {
      type: String,
      required: false
    }
  }
};
</script>

<style>
.modal {
  padding: var(--block-padding) var(--block-padding) 32px var(--block-padding);
  width: 90vw;
  max-width: 720px;
  max-height: 80vh;
  overflow-y: auto;
  background: white;
  border-radius: var(--radius);
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.1);
}
</style>
