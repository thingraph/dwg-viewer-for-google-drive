<template>
  <div class="google-drive-picker">
    <el-card class="picker-card">
      <template #header>
        <div class="card-header">
          <el-icon><FolderOpened /></el-icon>
          <span>Select DWG/DXF File from Google Drive™</span>
        </div>
      </template>

      <div class="picker-content">
        <div class="picker-prompt">
          <p>Click the button below to open Google Drive™ file picker and select a DWG or DXF file to view.</p>
          <el-button
            type="primary"
            size="large"
            @click="handlePickFile"
            :loading="isLoading"
            :disabled="!isAuthenticated"
            class="pick-button"
          >
            <el-icon><FolderOpened /></el-icon>
            &nbsp;Choose File from Google Drive™
          </el-button>
        </div>

        <div v-if="selectedFile" class="selected-file">
          <el-alert
            title="File Selected"
            type="success"
            :closable="false"
            show-icon
          />
          <div class="file-info-card">
            <div class="file-icon">
              <el-icon size="48" color="#409EFF">
                <Document />
              </el-icon>
            </div>
            <div class="file-details">
              <div class="file-name">{{ selectedFile.name }}</div>
              <div class="file-meta">
                <span v-if="selectedFile.size !== '0'">{{ formatFileSize(selectedFile.size) }}</span>
                <span v-if="selectedFile.size !== '0' && selectedFile.lastEditedUtc"> • </span>
                <span v-if="selectedFile.lastEditedUtc">{{ formatDate(selectedFile.lastEditedUtc) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="error" class="error-message">
          <el-alert
            :title="error"
            type="error"
            :closable="true"
            @close="error = ''"
            show-icon
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Document, FolderOpened } from '@element-plus/icons-vue'
import { ElAlert, ElButton, ElCard, ElIcon } from 'element-plus'
import { ref } from 'vue'

import { useGoogleDrive } from '../composables/useGoogleDrive'

interface DriveFile {
  id: string
  name: string
  size: string
  lastEditedUtc: string
  mimeType: string
  url: string
}

const emit = defineEmits<{
  fileSelected: [file: DriveFile]
}>()

const { openFilePicker, isAuthenticated } = useGoogleDrive()

const isLoading = ref(false)
const selectedFile = ref<DriveFile | null>(null)
const error = ref('')

const handlePickFile = async () => {
  if (!isAuthenticated.value) {
    error.value = 'Please connect to Google Drive™ first'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const file = await openFilePicker()
    selectedFile.value = file
    // Automatically emit fileSelected event to display the file immediately
    emit('fileSelected', file)
  } catch (err: any) {
    if (err.message === 'User cancelled file selection') {
      console.log(err.message)
    } else {
      error.value = err.message || 'Failed to select file. Please try again.'
      // Only clear selectedFile on actual errors, not on user cancellation
      // This preserves the file info display when user cancels the picker
    }
    // Don't clear selectedFile.value when user cancels - keep the previous file info visible
  } finally {
    isLoading.value = false
  }
}

const formatFileSize = (size: string) => {
  const bytes = parseInt(size)
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<style scoped>
.google-drive-picker {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.picker-card {
  border-radius: 0;
  box-shadow: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: none;
}

.picker-card :deep(.el-card__body) {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
}

.picker-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  padding: 12px 20px 20px 20px;
}

.picker-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
  flex: 1;
}

.picker-prompt p {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  max-width: 500px;
}

.pick-button {
  padding: 12px 24px;
  font-size: 16px;
}

.selected-file {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.file-info-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #f8f9fa;
}

.file-icon {
  flex-shrink: 0;
}

.file-details {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  word-break: break-word;
}

.file-meta {
  font-size: 14px;
  color: #666;
}

.file-actions {
  flex-shrink: 0;
}

.error-message {
  margin-top: 16px;
}
</style>
