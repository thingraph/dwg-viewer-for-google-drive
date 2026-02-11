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
      &nbsp;|&nbsp;
      <span style="font-size: 11px; color: #999;">Google Drive™ is a trademark of Google LLC.</span>
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
  height: 35px;
  box-sizing: border-box;
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
:root {
  --footer-height: 35px;
}

.app-main > .home-view,
.app-main > .local-file-view {
  flex: 1;
  overflow: hidden;
}

.app-main > .privacy-page,
.app-main > .terms-page,
.app-main > .support-page {
  flex: 1;
  overflow: auto;
}
</style>
