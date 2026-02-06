# DWG Viewer for Google Drive

A modern web application that integrates Google Drive with a powerful DWG viewer, allowing you to view DWG/DXF files directly from your Google Drive.

## Supported File Formats

- **DWG** - AutoCAD Drawing files
- **DXF** - Drawing Exchange Format

## Features

- 🎨 **2D CAD Viewer**: High-performance WebGL-based viewer for DWG/DXF files
- 📏 **Measurement Tools**: Measure distance, area, angle, and coordinates
- ✏️ **Markup & Annotation**: Add arrows, rectangles, circles, text, and other annotations
- 📑 **Layer Management**: Show/hide layers and manage layer visibility
- 📸 **Screenshot**: Capture and export high-quality images of drawings
- ⚙️ **Settings Panel**: Customize viewer settings and preferences
- 🎛️ **Interactive Toolbar**: Easy access to all viewer tools and features
- 🔄 **Layout Switching**: Switch between different layouts in multi-layout drawings
- 📤 **Local File Upload**: Upload and view local DWG/DXF files directly
- 🎯 **Navigation Tools**: Zoom, pan, rotate with axis gizmo and bottom bar controls

## Installation

```bash
npm install
# or
pnpm install
```

## Configuration

### Google API Setup

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Required APIs**:
   - Enable **Google Drive API**
   - Enable **Google Picker API** (important for file picker functionality)
   - Enable **Google Identity Services** (for OAuth)

3. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Create OAuth 2.0 Client ID (for authentication)
   - Create API Key (for Picker API)
   - For API Key restrictions:
     - Application restrictions: HTTP referrers (web sites)
     - Add your domain (e.g., `localhost:5173` for development, your production domain)
     - API restrictions: Restrict to "Google Picker API" and "Google Drive API"

4. **Set Environment Variables**:
   Create a `.env` file in the project root:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   VITE_GOOGLE_API_KEY=your-api-key
   ```

5. **Configure OAuth Consent Screen**:
   - Go to "APIs & Services" > "OAuth consent screen"
   - Configure the consent screen
   - Add scopes:
     - `https://www.googleapis.com/auth/userinfo.profile`
     - `https://www.googleapis.com/auth/drive.file`

## Development

Start the development server:
```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application:
```bash
npm run build
# or
pnpm build
```

Preview the production build:
```bash
npm run preview
# or
pnpm preview
```

## Usage

### Standard Mode (File Picker)
1. **Authentication**: Click "Connect Google Drive" to authenticate with your Google account
2. **Select File**: Click "Choose File from Google Drive" to open the Google Drive file picker
3. **Pick File**: Select a DWG or DXF file from your Google Drive
4. **View File**: The selected file will be loaded in the integrated viewer
5. **Navigation**: Use the CAD viewer's built-in navigation tools to zoom, pan, and explore the drawing

### Google Drive App Mode
1. **Install App**: Install the CAD Viewer as a Google Drive App
2. **Open Files**: Right-click on CAD files in Google Drive
3. **Select App**: Choose "Open with" → "CAD Viewer"
4. **View**: The file opens directly in the CAD viewer


## API Permissions

The application requests the following Google Drive permissions:
- `https://www.googleapis.com/auth/drive.file` - Access to files that the user explicitly selects via Google Drive Picker
- `https://www.googleapis.com/auth/userinfo.profile` - Get user info

**Note**: The application uses Google Drive Picker API, which means it can only access files that users explicitly select. It does not have access to browse or list all files in the user's Drive, providing better privacy and security.

## Google Drive App Integration

This application can be registered as a Google Drive App to handle CAD files directly. When properly configured:

- Users can right-click CAD files in Google Drive
- Select "Open with" → "CAD Viewer"
- The app opens with the selected file loaded

## Security

- All authentication is handled securely through Google's OAuth 2.0 flow
- API credentials are stored as environment variables
- The application uses Google Drive Picker API - users must explicitly select files to view
- Only files selected by the user can be accessed (no browsing of all Drive files)
- No file data is stored locally or transmitted to third-party servers

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

### Development Issues

- If you encounter TypeScript errors related to Google APIs, ensure the type declarations are properly loaded
- For build issues, try clearing the cache: `npm run clean && npm install`

## License

MIT License - see the main project LICENSE file for details.

## Acknowledgments

- [Element Plus](https://element-plus.org/) - Vue 3 UI framework
- [Google Drive API](https://developers.google.com/drive) - Google Drive integration