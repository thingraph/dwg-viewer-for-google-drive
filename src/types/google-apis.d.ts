declare global {
  interface Window {
    gapi: any
    google: any
  }

  // Declare global variables for Google APIs
  const gapi: any
  const google: any
}

declare namespace google {
  namespace accounts {
    namespace oauth2 {
      interface TokenClient {
        requestAccessToken(): void
      }

      function initTokenClient(config: {
        client_id: string
        scope: string
        callback: (response: any) => void
      }): TokenClient

      function revoke(token: string): void
    }
  }

  namespace picker {
    enum Action {
      PICKED = 'picked',
      CANCEL = 'cancel'
    }

    enum Response {
      ACTION = 'action',
      DOCUMENTS = 'docs'
    }

    enum ViewId {
      DOCS = 'docs',
      DOCS_IMAGES = 'docs-images',
      DOCS_IMAGES_AND_VIDEOS = 'docs-images-and-videos',
      DOCS_VIDEOS = 'docs-videos',
      DOCUMENTS = 'documents',
      DRAWINGS = 'drawings',
      FOLDERS = 'folders',
      FORMS = 'forms',
      PDFS = 'pdfs',
      PRESENTATIONS = 'presentations',
      SPREADSHEETS = 'spreadsheets'
    }

    interface DocsView {
      setMimeTypes(mimeTypes: string): DocsView
    }

    interface PickerBuilder {
      setOAuthToken(token: string): PickerBuilder
      setDeveloperKey(key: string): PickerBuilder
      setCallback(callback: (data: any) => void): PickerBuilder
      addView(view: DocsView | ViewId): PickerBuilder
      build(): Picker
    }

    interface Picker {
      setVisible(visible: boolean): void
    }

    class PickerBuilder {
      constructor()
    }

    class DocsView {
      constructor(viewId?: ViewId)
    }
  }
}

declare namespace gapi {
  namespace client {
    function init(config: {
      apiKey: string
      discoveryDocs: string[]
    }): Promise<void>

    function request(request: {
      path: string
    }): Promise<any>

    function getToken(): { access_token: string } | null

    function setToken(token: string | null): void

    namespace drive {
      namespace files {
        function list(params: {
          q?: string
          pageSize?: number
          pageToken?: string
          fields?: string
        }): Promise<{
          result: {
            files?: Array<{
              id: string
              name: string
              size: string
              lastEditedUtc: string
              mimeType: string
              url: string
            }>
            nextPageToken?: string
          }
        }>

        function get(params: {
          fileId: string
          alt?: string
          fields?: string
        }): Promise<{
          result: {
            body?: string
            webContentLink?: string
          }
        }>
      }
    }
  }

  function load(api: string, callback: () => void): void
}

export {}
