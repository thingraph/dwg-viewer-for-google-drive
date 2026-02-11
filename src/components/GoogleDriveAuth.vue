<template>
  <div class="google-drive-auth">
    <el-card class="auth-card">
      <template #header>
        <div class="card-header">
          <el-icon><FolderOpened /></el-icon>
          <span>Google Drive™ Integration</span>
        </div>
      </template>

      <div class="auth-content">
        <div v-if="!isAuthenticated" class="auth-prompt">
          <el-button
            type="primary"
            size="large"
            @click="authenticate"
            :loading="isLoading"
            class="auth-button"
          >
            <el-icon><FolderOpened /></el-icon>
            &nbsp;Connect Google Drive™
          </el-button>
        </div>

        <div v-else class="auth-success">
          <div class="auth-status">
            <el-alert
              title="Connected to Google Drive™"
              type="success"
              :closable="false"
              show-icon
            />
            <el-button size="small" @click="signOut" type="danger" text class="sign-out-btn">
              Sign Out
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { FolderOpened } from '@element-plus/icons-vue'
import { ElAlert, ElButton, ElCard, ElIcon } from 'element-plus'

import { useGoogleDrive } from '../composables/useGoogleDrive'

const {
  isAuthenticated,
  isLoading,
  // userInfo,
  authenticate,
  signOut
} = useGoogleDrive()
</script>

<style scoped>
.google-drive-auth {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.auth-card {
  border-radius: 0;
  box-shadow: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: none;
}

.auth-card :deep(.el-card__body) {
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

.auth-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  padding: 20px;
}

.auth-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
  flex: 1;
}

.auth-prompt p {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  max-width: 500px;
  margin: 0;
}

.auth-button {
  padding: 12px 24px;
  font-size: 16px;
}

.auth-success {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-status {
  display: flex;
  align-items: center;
  gap: 12px;
}

.auth-status :deep(.el-alert) {
  flex: 1;
}

.sign-out-btn {
  flex-shrink: 0;
  padding: 8px 12px;
  font-size: 12px;
}
</style>
