<template>
  <div class="credits">
    <h2 class="subtitle">
      A color palette generator for design systems.
    </h2>

    <div class="credits__author">by Lokesh Dhakar</div>
    <a href="https://twitter.com/lokesh" class="credits__link">Twitter</a> -
    <a href="https://lokeshdhakar.com" class="credits__link">Website</a>
  </div>
</template>

<script>
export default {
    name: 'Credits'
}
</script>

<style scoped>
.subtitle {
  font-size: var(--font-size-lg);
  margin-bottom: 8px;
  /*font-weight: var(--weight-normal);
  color: var(--color-muted);*/
}

.credits__author {
  display: block;
  color: var(--color-muted);
  text-decoration: none;
}

.credits__link {
  color: var(--color-muted);
  text-decoration: none;

  &:hover {
    color: var(--color-secondary);
    text-decoration: underline;
  }
}


</style>
