<template>
    <div class="credits">
      <a class="credits__author" href="https://lokeshdhakar.com"
        >by Lokesh Dhakar</a
      >
      <a href="https://twitter.com/lokesh" class="credits__link">Twitter</a> -
      <a href="https://lokeshdhakar.com" class="credits__link">Website</a>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Credits'
}
</script>

<style scoped>
.credits__author {
  display: block;
  color: var(--color-muted);
  text-decoration: none;
}

.credits__link {
  color: var(--color-muted);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}


</style>
