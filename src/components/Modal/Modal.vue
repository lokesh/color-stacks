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
  padding: 16px 16px 32px 16px;
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: var(--radius);
}
</style>
