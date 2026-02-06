<template>
  <div class="home-view">
    <div class="app-header">
      <h1>DWG Viewer for Google Drive</h1>
      <div class="header-actions">
        <router-link to="/privacy" class="header-link">Privacy</router-link>
        <router-link to="/terms" class="header-link">Terms</router-link>
        <router-link to="/local-file">
          <el-button type="primary" text>
            View local files
          </el-button>
        </router-link>
      </div>
    </div>

    <div class="app-content">
      <div v-if="isLoading" class="loading-container">
        <el-card class="loading-card">
          <div class="loading-content">
            <el-icon class="loading-icon" size="48"><Loading /></el-icon>
            <p>Loading DWG/DXF file from Google Drive...</p>
          </div>
        </el-card>
      </div>

      <div v-else-if="currentFile && isAuthenticated" class="drive-app-mode">
        <div class="file-header">
          <div class="file-info">
            <h2>{{ currentFile.name }}</h2>
            <p>Opened from Google Drive</p>
          </div>
          <div class="file-actions">
            <el-button @click="signOut" type="danger" text>
              Sign Out
            </el-button>
          </div>
        </div>

        <div class="cad-viewer-container">
          <div
            v-if="fileUrl"
            id="viewer-container"
            ref="viewerContainer"
            class="x-viewer-wrapper"
          ></div>
          <div v-else class="viewer-loading">
            <el-icon class="loading-icon" size="32"><Loading /></el-icon>
            <p>Loading file content...</p>
          </div>
        </div>
      </div>

      <div v-else class="standard-mode">
        <GoogleDriveAuth v-if="!isAuthenticated" />

        <div v-if="isAuthenticated" class="viewer-container">
          <div class="sidebar">
            <GoogleDriveFilePicker @file-selected="handleFileSelected" />
          </div>

          <div class="viewer-main">
            <div v-if="fileUrl" class="cad-viewer">
              <div
                id="viewer-container"
                ref="viewerContainer"
                class="x-viewer-wrapper"
              ></div>
            </div>

            <div v-else-if="isAuthenticated && !selectedFile" class="welcome-message">
              <el-empty description="Select a DWG/DXF file from Google Drive to view it" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'
import { Model2dConfig, Viewer2d, Viewer2dConfig } from '@x-viewer/core'
import {
  AxisGizmoPlugin,
  BottomBarPlugin,
  LayerManagerPlugin,
  MarkupPlugin,
  MeasurementPlugin,
  ScreenshotPlugin,
  Settings2dPlugin,
  ToolbarMenuId,
  Viewer2dToolbarPlugin
} from '@x-viewer/plugins'
import { onUnmounted, ref, watch, nextTick } from 'vue'

import GoogleDriveAuth from '../components/GoogleDriveAuth.vue'
import GoogleDriveFilePicker from '../components/GoogleDriveFilePicker.vue'
import { useGoogleDrive } from '../composables/useGoogleDrive'

interface DriveFile {
  id: string
  name: string
  size: string
  modifiedTime: string
  mimeType: string
}

const {
  isAuthenticated,
  isLoading,
  currentFile,
  getFileContent,
  signOut
} = useGoogleDrive()

const selectedFile = ref<DriveFile | null>(null)
const fileUrl = ref<string>('')
const viewerContainer = ref<HTMLElement | null>(null)
const viewer = ref<Viewer2d | null>(null)
const layerManagerPlugin = ref<LayerManagerPlugin | null>(null)

const cleanupBlobUrl = () => {
  if (fileUrl.value && fileUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(fileUrl.value)
  }
}

const cleanupViewer = () => {
  if (viewer.value) {
    viewer.value.destroy()
    viewer.value = null
  }
}

const loadFileAsBlob = async (fileId: string) => {
  try {
    const fileContent = await getFileContent(fileId)
    const blob = new Blob([fileContent])
    const blobUrl = URL.createObjectURL(blob)
    fileUrl.value = blobUrl
  } catch (error) {
    console.error('Error getting file content:', error)
  }
}

const initViewer = async () => {
  if (!viewerContainer.value || !fileUrl.value) return

  if (viewer.value) {
    viewer.value.destroy()
    viewer.value = null
  }

  try {
    const language = 'en'
    const viewerCfg = {
      containerId: 'viewer-container',
      language,
      enableSpinner: true,
      enableProgressBar: true,
      enableLayoutBar: true,
      enableLocalCache: false,
    } as Viewer2dConfig
    const viewerInstance: Viewer2d = new Viewer2d(viewerCfg)

    const fontFiles = ["libs/fonts/simplex.shx", "libs/fonts/hztxt.shx", "libs/fonts/arial.ttf", "libs/fonts/Microsoft_YaHei.ttf"]
    await viewerInstance.setFont(fontFiles)

    new AxisGizmoPlugin(viewerInstance as any, { ignoreZAxis: true })
    new BottomBarPlugin(viewerInstance as any)
    const layerManager = new LayerManagerPlugin(viewerInstance as any, { containerId: 'viewer-container', visible: false })
    layerManagerPlugin.value = layerManager
    new MarkupPlugin(viewerInstance as any)
    new MeasurementPlugin(viewerInstance as any, { language })
    new ScreenshotPlugin(viewerInstance as any)
    new Settings2dPlugin(viewerInstance as any, { language, visible: false, containerId: 'viewer-container' })

    const menuConfig = {
      [ToolbarMenuId.Layers]: {
        onActive: () => {
          if (layerManagerPlugin.value) {
            layerManagerPlugin.value.setVisible(true)
          }
        },
        onDeactive: () => {
          if (layerManagerPlugin.value) {
            layerManagerPlugin.value.setVisible(false)
          }
        },
        mutexIds: []
      }
    }

    new Viewer2dToolbarPlugin(viewerInstance as any, { menuConfig, language })

    try {
      const modelCfg = {
        modelId: currentFile.value?.name || selectedFile.value?.name || 'model_1',
        src: fileUrl.value,
        merge: true,
      } as Model2dConfig
      viewerInstance.loadModel(modelCfg)
    } catch (e) {
      console.error('Error loading file:', e)
    }

    viewer.value = viewerInstance
  } catch (error) {
    console.error('Error initializing viewer:', error)
  }
}

watch([fileUrl, viewerContainer], async ([url, container]) => {
  if (url && container && (currentFile.value || selectedFile.value)) {
    await nextTick()
    await initViewer()
  }
}, { immediate: true })

const handleFileSelected = async (file: DriveFile) => {
  selectedFile.value = file
  cleanupBlobUrl()
  fileUrl.value = ''
  cleanupViewer()
  await loadFileAsBlob(file.id)
}

watch(currentFile, async (file) => {
  if (file) {
    cleanupBlobUrl()
    fileUrl.value = ''
    cleanupViewer()
    await loadFileAsBlob(file.id)
  }
}, { immediate: true })

onUnmounted(() => {
  cleanupViewer()
  cleanupBlobUrl()
})
</script>

<style scoped>
.home-view {
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: white;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.app-header .header-actions {
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-link {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.95;
}

.header-link:hover {
  opacity: 1;
  text-decoration: underline;
}

.app-content {
  flex: 1;
  min-height: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-card {
  max-width: 400px;
  text-align: center;
}

.loading-content {
  padding: 40px;
}

.loading-icon {
  color: #409EFF;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.drive-app-mode {
  flex: 1;
  min-height: 0;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.file-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e4e7ed;
  background: #f8f9fa;
  flex-shrink: 0;
}

.file-info h2 {
  margin: 0 0 4px 0;
  color: #333;
  font-size: 1.5rem;
}

.file-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.cad-viewer-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.x-viewer-wrapper {
  width: 100%;
  height: 100%;
}

.viewer-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #666;
}

.standard-mode {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.viewer-container {
  flex: 1;
  min-height: 0;
  display: flex;
  gap: 20px;
  width: 100%;
  background: white;
  padding-right: 2px;
  border-radius: 0px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0;
}

.sidebar {
  width: 400px;
  border-right: 1px solid #e4e7ed;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}

.viewer-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}


.cad-viewer {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.cad-viewer .x-viewer-wrapper {
  width: 100%;
  height: 100%;
}

.welcome-message {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

@media (max-width: 1024px) {
  .viewer-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e4e7ed;
  }

  .file-header {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }

  .app-content {
    padding: 0 10px 20px;
  }

  .viewer-container,
  .drive-app-mode {
    margin: 0 10px;
  }
}
</style>
