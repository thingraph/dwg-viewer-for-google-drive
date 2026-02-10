<template>
  <div class="local-file-view">
    <div class="app-header">
      <h1>Local DWG/DXF Viewer</h1>
      <div class="header-actions">
        <router-link to="/" class="header-link">
          <el-button type="primary" text>
            <el-icon><ArrowLeft /></el-icon>
            Back to Google Drive
          </el-button>
        </router-link>
      </div>
    </div>

    <div class="local-file-viewer">
      <div id="local-viewer-container" ref="viewerContainer" class="x-viewer-wrapper"></div>

      <!-- Floating Upload Button -->
      <div class="floating-upload-btn">
        <el-button type="primary" @click="openFileBrowser">
          <el-icon><Upload /></el-icon>
          &nbsp;Upload DWG/DXF
        </el-button>
      </div>

      <!-- Floating controls -->
      <div class="floating-controls">
        <!-- File names display -->
        <div v-if="loadedFileNames.length > 0" class="current-file-names">
          <span v-for="(name, index) in loadedFileNames" :key="index" class="file-name-tag">
            {{ name }}
            <span v-if="index < loadedFileNames.length - 1"> | </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Upload } from '@element-plus/icons-vue'
import { Viewer2d, Viewer2dConfig } from '@x-viewer/core'
import {
  AxisGizmoPlugin,
  BottomBarPlugin,
  LayerManagerPlugin,
  LocalDxfUploader,
  MarkupPlugin,
  MeasurementPlugin,
  ScreenshotPlugin,
  Settings2dPlugin,
  ToolbarMenuId,
  Viewer2dToolbarPlugin
} from '@x-viewer/plugins'
import { onMounted, onUnmounted, ref, nextTick } from 'vue'

const viewerContainer = ref<HTMLElement | null>(null)
const viewer = ref<Viewer2d | null>(null)
const layerManagerPlugin = ref<LayerManagerPlugin | null>(null)
const modelUploader = ref<LocalDxfUploader | null>(null)
const loadedFileNames = ref<string[]>([])

const openFileBrowser = () => {
  if (modelUploader.value) {
    modelUploader.value.openFileBrowserToUpload()
  }
}

const initViewer = async () => {
  if (!viewerContainer.value) return

  try {
    const language = 'en'
    const viewerCfg = {
      containerId: 'local-viewer-container',
      language,
      enableSpinner: true,
      enableProgressBar: true,
      enableLayoutBar: true,
      enableLocalCache: false
    } as Viewer2dConfig

    const viewerInstance: Viewer2d = new Viewer2d(viewerCfg)

    // Set fonts (optional, can be removed if not needed)
    const fontFiles = ["libs/fonts/simplex.shx", "libs/fonts/hztxt.shx", "libs/fonts/arial.ttf", "libs/fonts/Microsoft_YaHei.ttf"]
    await viewerInstance.setFont(fontFiles)

    // Add plugins
    new AxisGizmoPlugin(viewerInstance as any, { ignoreZAxis: true })
    new BottomBarPlugin(viewerInstance as any)
    const layerManager = new LayerManagerPlugin(viewerInstance as any, {
      containerId: 'local-viewer-container',
      visible: false
    })
    layerManagerPlugin.value = layerManager
    new MarkupPlugin(viewerInstance as any)
    new MeasurementPlugin(viewerInstance as any, { language })
    new ScreenshotPlugin(viewerInstance as any)
    new Settings2dPlugin(viewerInstance as any, {
      language,
      visible: false,
      containerId: 'local-viewer-container'
    })
    // new StatsPlugin(viewerInstance as any)

    // Create toolbar plugin with menu config
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

    // Initialize LocalDxfUploader
    const uploader = new LocalDxfUploader(viewerInstance as any)

    uploader.onSuccess = (event: any) => {
      if (event && event.fileName) {
        if (!loadedFileNames.value.includes(event.fileName)) {
          loadedFileNames.value.push(event.fileName)
        }
      }
    }

    uploader.onError = (event: any) => {
      if (event && event.fileName) {
        console.error(`Failed to load ${event.fileName}:`, event.error)
        // You can show an error message here using Element Plus notification
      }
    }

    // File input is not directly used, LocalDxfUploader handles file selection internally

    modelUploader.value = uploader
    viewer.value = viewerInstance
  } catch (error) {
    console.error('Error initializing viewer:', error)
  }
}

onMounted(async () => {
  await nextTick()
  await initViewer()
})

onUnmounted(() => {
  if (viewer.value) {
    viewer.value.destroy()
    viewer.value = null
  }
})
</script>

<style scoped>
.local-file-view {
  height: 100%;
  min-height: calc(100vh - var(--footer-height, 50px));
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
  text-decoration: none;
}

.local-file-viewer {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #000;
  min-height: 0;
  margin: 0;
  padding: 0;
  border-radius: 0;
}

.x-viewer-wrapper {
  width: 100%;
  height: 100%;
}

.floating-upload-btn {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.floating-controls {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  pointer-events: none;
}

.current-file-names {
  color: #eeeeee;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 12px;
  border-radius: 4px;
  pointer-events: auto;
}

.file-name-tag {
  color: #eeeeee;
}
</style>

