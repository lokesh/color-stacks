<template>
  <div class="modal" @click.stop>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style>
.modal {
  padding: 16px;
  width: 100%;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: var(--radius);
}
</style>
