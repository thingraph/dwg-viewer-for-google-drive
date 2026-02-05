<template>
  <div id="app-root">
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
#app-root {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>

<style>
#app-root > .home-view {
  flex: 1;
  overflow: hidden;
}

#app-root > .privacy-page,
#app-root > .terms-page {
  flex: 1;
  overflow: auto;
}
</style>
