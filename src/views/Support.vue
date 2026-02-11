<template>
  <div class="support-page">
    <div class="app-header">
      <h1>Support & Help</h1>
      <div class="header-actions">
        <router-link to="/" class="header-link">
          <el-button type="primary" text>
            <el-icon><ArrowLeft /></el-icon>
            Back to Google Drive™
          </el-button>
        </router-link>
      </div>
    </div>

    <div class="support-content">
      <p class="intro">
        Welcome to the <strong>DWG Viewer for Google Drive™</strong> support page. Here you'll find answers to common
        questions, usage guides, and troubleshooting tips. If you need additional help, please don't hesitate to
        <a href="mailto:thingraph@outlook.com">contact us</a>.
      </p>

      <section>
        <h2>📖 Getting Started</h2>
        <h3>How to Use the Application</h3>
        <ol>
          <li>
            <strong>Connect to Google Drive™:</strong> Click the "Connect Google Drive™" button to authenticate with your
            Google account. You'll be asked to grant permission to access your Google Drive™ files.
          </li>
          <li>
            <strong>Select a File:</strong> After connecting, click "Choose File from Google Drive™" to open the file
            picker. Browse and select a DWG or DXF file from your Drive.
          </li>
          <li>
            <strong>View Your File:</strong> Once selected, the file will automatically load in the viewer. Use the
            toolbar controls to zoom, pan, measure, and annotate your drawing.
          </li>
          <li>
            <strong>View Local Files:</strong> You can also upload and view local DWG/DXF files from your computer using
            the "View Local Files" option.
          </li>
        </ol>
      </section>

      <section>
        <h2>❓ Frequently Asked Questions (FAQ)</h2>

        <div class="faq-item">
          <h3>What file formats are supported?</h3>
          <p>
            The application supports <strong>DWG</strong> (AutoCAD Drawing) and <strong>DXF</strong> (Drawing Exchange
            Format) files. These are the standard formats for CAD drawings.
          </p>
        </div>

        <div class="faq-item">
          <h3>Do I need to install anything?</h3>
          <p>
            No installation is required! This is a web-based application that runs entirely in your browser. Just visit
            the website and start using it.
          </p>
        </div>

        <div class="faq-item">
          <h3>Is my data secure?</h3>
          <p>
            Yes. The application uses Google's OAuth 2.0 for secure authentication. File content is processed locally in
            your browser and is never sent to our servers. We only request minimal permissions to access files you
            explicitly select. For more details, see our <router-link to="/privacy">Privacy Policy</router-link>.
          </p>
        </div>

        <div class="faq-item">
          <h3>What permissions does the app request?</h3>
          <p>
            The app requests permission to access files you explicitly select via the Google Drive™ file picker. It does
            <strong>not</strong> have access to browse all your Drive files automatically. You maintain full control over
            which files are accessed.
          </p>
        </div>

        <div class="faq-item">
          <h3>Can I use this offline?</h3>
          <p>
            The application requires an internet connection to authenticate with Google Drive™ and load files. However,
            once a file is loaded, you can view it without additional network requests (until you refresh the page).
          </p>
        </div>

        <div class="faq-item">
          <h3>How do I revoke access to my Google account?</h3>
          <p>
            You can revoke access at any time by visiting your
            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
              Google Account permissions page
            </a>
            and removing the app from the list of connected apps.
          </p>
        </div>

        <div class="faq-item">
          <h3>Can I edit DWG/DXF files?</h3>
          <p>
            Currently, the application is a <strong>viewer only</strong>. You can view, measure, and annotate drawings,
            but you cannot edit the original file. For editing, you'll need to use a dedicated CAD application like
            AutoCAD.
          </p>
        </div>
      </section>

      <section>
        <h2>🔧 Troubleshooting</h2>

        <div class="troubleshooting-item">
          <h3>Authentication Issues</h3>
          <p><strong>Problem:</strong> Unable to connect to Google Drive™ or authentication fails.</p>
          <p><strong>Solutions:</strong></p>
          <ul>
            <li>Make sure you're using a supported browser (Chrome, Firefox, Edge, Safari)</li>
            <li>Check that third-party cookies are enabled in your browser settings</li>
            <li>Clear your browser cache and cookies, then try again</li>
            <li>Ensure you're not using an ad blocker that might interfere with Google APIs</li>
            <li>Try signing out and signing back in to your Google account</li>
          </ul>
        </div>

        <div class="troubleshooting-item">
          <h3>File Won't Load</h3>
          <p><strong>Problem:</strong> Selected file doesn't load or shows an error.</p>
          <p><strong>Solutions:</strong></p>
          <ul>
            <li>Verify the file is a valid DWG or DXF file</li>
            <li>Check that the file isn't corrupted or password-protected</li>
            <li>Ensure you have permission to access the file in Google Drive™</li>
            <li>Try refreshing the page and selecting the file again</li>
            <li>For very large files, loading may take longer - please be patient</li>
          </ul>
        </div>

        <div class="troubleshooting-item">
          <h3>Viewer Performance Issues</h3>
          <p><strong>Problem:</strong> Viewer is slow or unresponsive.</p>
          <p><strong>Solutions:</strong></p>
          <ul>
            <li>Large or complex drawings may take longer to render - this is normal</li>
            <li>Close other browser tabs to free up system resources</li>
            <li>Update your browser to the latest version</li>
            <li>Ensure your graphics drivers are up to date</li>
            <li>Try using a different browser to see if the issue persists</li>
          </ul>
        </div>

        <div class="troubleshooting-item">
          <h3>File Picker Not Opening</h3>
          <p><strong>Problem:</strong> Google Drive™ file picker doesn't appear.</p>
          <p><strong>Solutions:</strong></p>
          <ul>
            <li>Check that pop-up blockers are disabled for this site</li>
            <li>Ensure JavaScript is enabled in your browser</li>
            <li>Verify your internet connection is stable</li>
            <li>Try refreshing the page and clicking the button again</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>📚 Features Guide</h2>

        <div class="feature-item">
          <h3>Navigation Tools</h3>
          <ul>
            <li><strong>Zoom:</strong> Use the mouse wheel, zoom buttons, or pinch gesture on touch devices</li>
            <li><strong>Pan:</strong> Click and drag to move around the drawing</li>
            <li><strong>Fit to Screen:</strong> Click the fit button to view the entire drawing</li>
          </ul>
        </div>

        <div class="feature-item">
          <h3>Measurement Tools</h3>
          <ul>
            <li>Measure distances between points</li>
            <li>Calculate areas of closed shapes</li>
            <li>View coordinates of specific points</li>
          </ul>
        </div>

        <div class="feature-item">
          <h3>Annotation Tools</h3>
          <ul>
            <li>Add arrows, rectangles, circles, and text annotations</li>
            <li>Mark important areas or features</li>
            <li>Export annotated drawings as images</li>
          </ul>
        </div>

        <div class="feature-item">
          <h3>Layer Management</h3>
          <ul>
            <li>Show or hide specific layers</li>
            <li>Control layer visibility to focus on specific parts of the drawing</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>📧 Contact & Support</h2>
        <p>
          If you have questions, encounter issues not covered here, or would like to provide feedback, please contact us:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>
            <a href="mailto:thingraph@outlook.com">thingraph@outlook.com</a>
          </li>
          <li>
            <strong>GitHub:</strong>
            <a href="https://github.com/thingraph/dwg-viewer-example" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </li>
        </ul>
        <p>
          We typically respond within 24-48 hours. For bug reports, please include:
        </p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Steps to reproduce the issue</li>
          <li>Any error messages you see</li>
        </ul>
      </section>

      <section>
        <h2>📄 Additional Resources</h2>
        <ul>
          <li>
            <router-link to="/privacy">Privacy Policy</router-link> - Learn how we handle your data
          </li>
          <li>
            <router-link to="/terms">Terms of Service</router-link> - Read our terms and conditions
          </li>
          <li>
            <a href="https://developers.google.com/drive" target="_blank" rel="noopener noreferrer">
              Google Drive™ API Documentation
            </a>
            - Learn more about Google Drive™ integration
          </li>
        </ul>
      </section>

      <section class="trademark-notice">
        <p style="font-size: 12px; color: #999; margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee;">
          Google Drive™ is a trademark of Google LLC.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
</script>

<style scoped>
.support-page {
  min-height: calc(100vh - var(--footer-height, 50px));
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: auto;
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

.support-content {
  max-width: 800px;
  margin: 24px auto 32px;
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px 48px;
}

.intro {
  margin: 0 0 24px 0;
  line-height: 1.6;
  color: #333;
}

section {
  margin-bottom: 32px;
}

section:last-child {
  margin-bottom: 0;
}

h2 {
  margin: 0 0 16px 0;
  font-size: 1.25rem;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid #667eea;
  padding-bottom: 8px;
}

h3 {
  margin: 20px 0 12px 0;
  font-size: 1.1rem;
  color: #444;
  font-weight: 600;
}

p {
  margin: 0 0 12px 0;
  line-height: 1.6;
  color: #555;
}

ul,
ol {
  margin: 0 0 12px 0;
  padding-left: 24px;
}

li {
  margin-bottom: 8px;
  line-height: 1.6;
  color: #555;
}

a {
  color: #409EFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.faq-item,
.troubleshooting-item,
.feature-item {
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.faq-item h3,
.troubleshooting-item h3,
.feature-item h3 {
  margin-top: 0;
  color: #667eea;
}

.troubleshooting-item p:first-of-type {
  font-weight: 500;
  color: #333;
}

@media (max-width: 768px) {
  .support-content {
    margin-left: 12px;
    margin-right: 12px;
    padding: 24px 20px;
  }

  .app-header h1 {
    font-size: 1.25rem;
  }

  h2 {
    font-size: 1.1rem;
  }

  h3 {
    font-size: 1rem;
  }
}
</style>

