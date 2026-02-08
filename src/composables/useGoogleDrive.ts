import { onMounted, reactive, ref } from 'vue'

// Google Drive API configuration
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || ''
// const SCOPES = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file'
const SCOPES = 'https://www.googleapis.com/auth/drive.file'

// interface UserInfo {
//   name: string
//   email: string
//   picture: string
// }

interface DriveFile {
  id: string
  name: string
  size: string
  modifiedTime: string
  mimeType: string
}


// Google Drive App integration
interface DriveAppAction {
  action: string
  fileId: string
  fileName: string
  mimeType: string
}

// Shared state so all components (App.vue, GoogleDriveAuth, GoogleDriveFilePicker) see the same isAuthenticated
const isAuthenticated = ref(false)
const isLoading = ref(false)
const currentFile = ref<DriveFile | null>(null)
// const userInfo = reactive<UserInfo>({
//   name: '',
//   email: '',
//   picture: ''
// })

let tokenClient: any = null
let gapiInited = false
let gisInited = false


export function useGoogleDrive() {

  // Initialize Google APIs
  const initializeGoogleAPIs = async () => {
    if (gapiInited && gisInited) return

    try {
      // Load the Google API client library
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://apis.google.com/js/api.js'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load Google API'))
        document.head.appendChild(script)
      })

      // Load the Google Identity Services library
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load Google Identity Services'))
        document.head.appendChild(script)
      })

      // Initialize gapi
      await new Promise<void>((resolve) => {
        gapi.load('client:picker', resolve)
      })

      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
      })

      gapiInited = true

      // Initialize Google Identity Services
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: handleTokenResponse
      })

      gisInited = true
    } catch (error) {
      console.error('Failed to initialize Google APIs:', error)
    }
  }

  const handleTokenResponse = (response: any) => {
    if (response.error) {
      console.error('Authentication error:', response.error)
      return
    }

    // Get user info
    // gapi.client.request({
    //   path: 'https://www.googleapis.com/oauth2/v2/userinfo'
    // }).then((userResponse: any) => {
    //   userInfo.name = userResponse.result.name
    //   userInfo.email = userResponse.result.email
    //   userInfo.picture = userResponse.result.picture
    //   isAuthenticated.value = true
    // }).catch((error: any) => {
    //   console.error('Error getting user info:', error)
    // })
    isAuthenticated.value = true
  }

  const authenticate = async () => {
    if (!CLIENT_ID || !API_KEY) {
      console.error('Google API credentials not configured')
      return
    }

    isLoading.value = true
    try {
      await initializeGoogleAPIs()

      if (tokenClient) {
        tokenClient.requestAccessToken()
      }
    } catch (error) {
      console.error('Authentication failed:', error)
    } finally {
      isLoading.value = false
    }
  }

  const signOut = () => {
    const token = gapi.client.getToken()
    if (token) {
      google.accounts.oauth2.revoke(token.access_token)
      gapi.client.setToken('')
    }

    isAuthenticated.value = false
    // userInfo.name = ''
    // userInfo.email = ''
    // userInfo.picture = ''
  }

  // Handle Google Drive App integration
  const handleDriveAppAction = async (action: DriveAppAction) => {
    console.log('Drive App Action:', action)

    if (action.action === 'open') {
      try {
        // Get file details
        const fileDetails = await getFileDetails(action.fileId)
        currentFile.value = fileDetails

        // Authenticate if needed
        if (!isAuthenticated.value) {
          await authenticate()
        }
      } catch (error) {
        console.error('Error handling Drive App action:', error)
      }
    }
  }

  const getFileDetails = async (fileId: string): Promise<DriveFile> => {
    try {
      const response = await gapi.client.drive.files.get({
        fileId: fileId,
        fields: 'id,name,size,modifiedTime,mimeType'
      })

      return {
        id: response.result.id!,
        name: response.result.name!,
        size: response.result.size || '0',
        modifiedTime: response.result.modifiedTime!,
        mimeType: response.result.mimeType!
      }
    } catch (error) {
      console.error('Error getting file details:', error)
      throw error
    }
  }

  const getFileDownloadUrl = async (fileId: string): Promise<string> => {
    if (!isAuthenticated.value) {
      throw new Error('Not authenticated')
    }

    try {
      const response = await gapi.client.drive.files.get({
        fileId: fileId,
        fields: 'webContentLink'
      })

      return response.result.webContentLink || ''
    } catch (error) {
      console.error('Error getting download URL:', error)
      throw error
    }
  }

  const getFileContent = async (fileId: string): Promise<ArrayBuffer> => {
    if (!isAuthenticated.value) {
      throw new Error('Not authenticated')
    }

    try {
      const token = gapi.client.getToken()
      if (!token) {
        throw new Error('No access token available')
      }

      // Use fetch API to get binary file content with authentication
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`)
      }

      return await response.arrayBuffer()
    } catch (error) {
      console.error('Error getting file content:', error)
      throw error
    }
  }

  // Google Drive Picker API - allows user to select a file without drive.readonly permission
  const openFilePicker = async (): Promise<DriveFile> => {
    if (!isAuthenticated.value) {
      throw new Error('Please authenticate first')
    }

    if (!API_KEY) {
      throw new Error('Google API Key is not configured. Please set VITE_GOOGLE_API_KEY in your environment variables.')
    }

    const token = gapi.client.getToken()
    if (!token || !token.access_token) {
      throw new Error('No access token available. Please authenticate first.')
    }

    return new Promise((resolve, reject) => {
      // Load the Picker API if not already loaded
      if (typeof google?.picker === 'undefined') {
        gapi.load('picker', () => {
          createPicker(token.access_token, resolve, reject)
        })
      } else {
        createPicker(token.access_token, resolve, reject)
      }
    })
  }

  const createPicker = (accessToken: string, resolve: (file: DriveFile) => void, reject: (error: Error) => void) => {
    try {
      if (!API_KEY) {
        reject(new Error('Google API Key is not configured. Please set VITE_GOOGLE_API_KEY in your environment variables.'))
        return
      }

      // Create a DocsView with MIME type filtering
      // DocsView defaults to list view, no need to set mode explicitly
      const docsView = new google.picker.DocsView(google.picker.ViewId.DOCS)
      docsView.setMimeTypes('application/acad,application/dxf,image/vnd.dwg,image/vnd.dxf,application/autocad_dwg,application/autocad_dxf')

      const picker = new google.picker.PickerBuilder()
        .setOAuthToken(accessToken)
        .setDeveloperKey(API_KEY)
        .addView(docsView)
        .setCallback((data: any) => {
          if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
            const file = data[google.picker.Response.DOCUMENTS][0]
            // Get file details using the file ID
            getFileDetails(file.id)
              .then((fileDetails) => {
                resolve(fileDetails)
              })
              .catch((error) => {
                console.error('Error getting file details:', error)
                reject(new Error('Failed to get file details. Please try again.'))
              })
          } else if (data[google.picker.Response.ACTION] === google.picker.Action.CANCEL) {
            reject(new Error('User cancelled file selection'))
          }
        })
        .build()

      picker.setVisible(true)
    } catch (error: any) {
      console.error('Error creating picker:', error)
      let errorMessage = 'Failed to open file picker. '

      if (error?.message?.includes('developer key') || error?.message?.includes('API key')) {
        errorMessage += 'The Google API Key is invalid or not configured correctly. Please check:\n' +
          '1. VITE_GOOGLE_API_KEY is set in your .env file\n' +
          '2. The API key is valid in Google Cloud Console\n' +
          '3. Google Picker API is enabled for your project\n' +
          '4. The API key has no restrictions or allows your domain'
      } else {
        errorMessage += 'Please try again.'
      }

      reject(new Error(errorMessage))
    }
  }

  // Initialize Drive App integration
  onMounted(() => {
    // Check if we're being opened as a Drive App
    const urlParams = new URLSearchParams(window.location.search)
    const action = urlParams.get('action')
    const fileId = urlParams.get('fileId')
    const fileName = urlParams.get('fileName')
    const mimeType = urlParams.get('mimeType')

    if (action && fileId && fileName && mimeType) {
      handleDriveAppAction({
        action,
        fileId,
        fileName,
        mimeType
      })
    }

    // Listen for Drive App messages
    window.addEventListener('message', (event) => {
      if (event.origin === 'https://drive.google.com' && event.data.type === 'drive-app-action') {
        handleDriveAppAction(event.data.action)
      }
    })
  })

  return {
    isAuthenticated,
    isLoading,
    // userInfo,
    currentFile,
    authenticate,
    signOut,
    openFilePicker,
    getFileContent,
    getFileDownloadUrl,
    getFileDetails,
    handleDriveAppAction
  }
}
