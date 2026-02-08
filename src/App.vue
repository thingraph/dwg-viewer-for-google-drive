<template>
  <div id="app-root">
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">
      Contact:
      <a href="mailto:thingraph@outlook.com">thingraph@outlook.com</a>
      &nbsp;|&nbsp;
      <a href="https://github.com/thingraph/dwg-viewer-example" target="_blank" rel="noopener noreferrer">GitHub</a>
    </footer>
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

.app-main {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-footer {
  flex-shrink: 0;
  padding: 10px 20px;
  text-align: center;
  font-size: 13px;
  color: #666;
  background: #f5f5f5;
  border-top: 1px solid #eee;
}

.app-footer a {
  color: #409eff;
  text-decoration: none;
}

.app-footer a:hover {
  text-decoration: underline;
}
</style>

<style>
.app-main > .home-view,
.app-main > .local-file-view {
  flex: 1;
  overflow: hidden;
}

.app-main > .privacy-page,
.app-main > .terms-page {
  flex: 1;
  overflow: auto;
}
</style>
