<template>
  <div class="privacy-page">
    <div class="privacy-header">
      <router-link to="/" class="privacy-back">← DWG Viewer for Google Drive</router-link>
      <h1>Privacy Policy</h1>
      <p class="privacy-meta">Effective Date: February 5, 2025</p>
    </div>

    <div class="privacy-content">
      <p class="intro">
        This Privacy Policy explains how we collect, use, and protect information when you use
        <strong>DWG Viewer for Google Drive</strong> (“the Service”). By using the Service, you agree to this policy.
      </p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>
          The Service allows you to view DWG and DXF files from your Google Drive. To provide this functionality:
        </p>
        <ul>
          <li>
            <strong>Google Account:</strong> When you sign in, we use Google OAuth to access your Google account
            only for the purpose of listing and opening files from your Google Drive. We do not store your Google
            password.
          </li>
          <li>
            <strong>Drive file access:</strong> We request permission to read file metadata and file content
            only for the files you choose to open in the viewer. File content is loaded in your browser and is
            not sent to our servers for storage.
          </li>
          <li>
            <strong>Local storage:</strong> We may store tokens or preferences in your browser (e.g. for
            keeping you signed in) in accordance with Google’s OAuth and API policies.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>We use the information described above to:</p>
        <ul>
          <li>Authenticate you with Google and display your Drive files</li>
          <li>Load and display the DWG/DXF files you select in the viewer</li>
          <li>Improve and maintain the Service</li>
        </ul>
        <p>We do not use your data to train or fine-tune machine learning models.</p>
      </section>

      <section>
        <h2>3. Sharing of Information</h2>
        <p>
          We do not sell your personal information. We may share information only:
        </p>
        <ul>
          <li>With Google, as necessary to provide the Google Drive integration (subject to
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s Privacy Policy</a>)
          </li>
          <li>With service providers that host or operate the Service, under strict confidentiality</li>
          <li>When required by law or to protect our rights and safety</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Retention & Security</h2>
        <p>
          File content is processed in your browser and is not retained on our servers. We retain only what is
          necessary for the Service (e.g. session or auth-related data) and delete or anonymize it when no longer
          needed. We use appropriate technical and organizational measures to protect your data.
        </p>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <p>You may:</p>
        <ul>
          <li>Revoke our access to your Google account at any time via your
            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">Google Account permissions</a>
          </li>
          <li>Request access, correction, or deletion of personal data we hold about you</li>
          <li>Opt out of marketing communications if we ever send them</li>
          <li>Lodge a complaint with a data protection authority in your jurisdiction</li>
        </ul>
      </section>

      <section>
        <h2>6. Third-Party Services</h2>
        <p>
          The Service uses Google APIs (e.g. Google Drive API). Your use of the Service is also subject to
          Google’s Privacy Policy and Terms of Service. We encourage you to review them.
        </p>
      </section>

      <section>
        <h2>7. Children’s Privacy</h2>
        <p>
          We do not knowingly collect personal information from children under 18. If you believe a child has
          provided us with personal information, please contact us so we can delete it.
        </p>
      </section>

      <section>
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the updated policy on this page and
          update the “Effective Date.” Continued use of the Service after changes constitutes acceptance of the
          updated policy.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or your personal data, please contact us at the
          email or address provided in the application or on the project repository.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.privacy-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
}

.privacy-header {
  max-width: 800px;
  margin: 0 auto 32px;
  color: white;
}

.privacy-header h1 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
}

.privacy-back {
  display: inline-block;
  margin-bottom: 12px;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.95;
}

.privacy-back:hover {
  opacity: 1;
  text-decoration: underline;
}

.privacy-meta {
  margin: 0;
  opacity: 0.9;
  font-size: 0.95rem;
}

.privacy-content {
  max-width: 800px;
  margin: 0 auto;
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
  margin-bottom: 28px;
}

section:last-child {
  margin-bottom: 0;
}

h2 {
  margin: 0 0 12px 0;
  font-size: 1.25rem;
  color: #333;
  font-weight: 600;
}

p {
  margin: 0 0 12px 0;
  line-height: 1.6;
  color: #555;
}

ul {
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

@media (max-width: 768px) {
  .privacy-content {
    padding: 24px 20px;
  }

  .privacy-header h1 {
    font-size: 1.5rem;
  }
}
</style>
