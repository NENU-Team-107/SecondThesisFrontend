<script setup lang="ts">
</script>
<template>
  <div class="container">
    <aside>
      <slot name="aside"></slot>
    </aside>
    <div class="m-container">
      <header>
        <slot name="header"></slot>
      </header>
      <main class="m-container-content">
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@import url(./BaseLayout.less);
</style>