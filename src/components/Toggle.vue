<template>
   <toggle-button
    class="toggle-button"
    :sync="true"
    :width="36"
    :height="18"
    :margin="2"
    color="var(--selected-color)"
    @change="val => $emit('input', val.value)"
    v-bind="$attrs"
  />
</template>

<script>

export default {
  name: 'Toggle',
}

</script>
