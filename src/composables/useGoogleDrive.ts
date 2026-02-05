import { onMounted, reactive, ref } from 'vue'

// Google Drive API configuration
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || ''
const SCOPES = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.readonly'

interface UserInfo {
  name: string
  email: string
  picture: string
}

interface DriveFile {
  id: string
  name: string
  size: string
  modifiedTime: string
  mimeType: string
}

interface SearchResult {
  files: DriveFile[]
  total: number
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
const userInfo = reactive<UserInfo>({
  name: '',
  email: '',
  picture: ''
})

let tokenClient: any = null
let gapiInited = false
let gisInited = false

// Store page tokens for pagination
// Key format: "query:page" -> pageToken
const pageTokenCache = new Map<string, string>()

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
        gapi.load('client', resolve)
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
    gapi.client.request({
      path: 'https://www.googleapis.com/oauth2/v2/userinfo'
    }).then((userResponse: any) => {
      userInfo.name = userResponse.result.name
      userInfo.email = userResponse.result.email
      userInfo.picture = userResponse.result.picture
      isAuthenticated.value = true
    }).catch((error: any) => {
      console.error('Error getting user info:', error)
    })
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
    userInfo.name = ''
    userInfo.email = ''
    userInfo.picture = ''
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

  // Legacy search functionality (for file browser)
  const searchFiles = async (query: string, page: number = 1, pageSize: number = 20): Promise<SearchResult> => {
    if (!isAuthenticated.value) {
      throw new Error('Not authenticated')
    }

    try {
      // Clear cache if it's a new query (page 1)
      if (page === 1) {
        pageTokenCache.clear()
      }

      // Get the page token for this page
      const cacheKey = `${query}:${page}`
      let pageToken = pageTokenCache.get(cacheKey)

      // If we don't have a token for this page, we need to fetch from the beginning
      // and navigate to the desired page
      if (!pageToken && page > 1) {
        // Fetch pages sequentially until we reach the desired page
        let currentPage = 1
        let nextToken: string | undefined = undefined
        
        while (currentPage < page) {
          const response: any = await gapi.client.drive.files.list({
            q: query,
            pageSize: pageSize,
            pageToken: nextToken,
            fields: 'files(id,name,size,modifiedTime,mimeType),nextPageToken'
          })

          nextToken = response.result.nextPageToken
          if (!nextToken) {
            // No more pages available
            break
          }

          // Cache the token for the next page
          const nextPageKey = `${query}:${currentPage + 1}`
          pageTokenCache.set(nextPageKey, nextToken)
          
          currentPage++
        }

        pageToken = nextToken
      }

      // Fetch the current page
      const response = await gapi.client.drive.files.list({
        q: query,
        pageSize: pageSize,
        pageToken: pageToken,
        fields: 'files(id,name,size,modifiedTime,mimeType),nextPageToken'
      })

      const files = response.result.files || []
      const nextPageToken = response.result.nextPageToken

      // Cache the next page token if it exists
      if (nextPageToken) {
        const nextPageKey = `${query}:${page + 1}`
        pageTokenCache.set(nextPageKey, nextPageToken)
      }

      // Calculate total: if there's a next page token, we estimate there are more files
      // Since Google Drive API doesn't provide total count, we use a large number
      // or calculate based on current page and whether there's a next page
      const estimatedTotal = nextPageToken 
        ? page * pageSize + 1 // At least one more page
        : (page - 1) * pageSize + files.length

      return {
        files: files,
        total: estimatedTotal
      }
    } catch (error) {
      console.error('Error searching files:', error)
      throw error
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
    userInfo,
    currentFile,
    authenticate,
    signOut,
    searchFiles,
    getFileContent,
    getFileDownloadUrl,
    getFileDetails,
    handleDriveAppAction
  }
}
