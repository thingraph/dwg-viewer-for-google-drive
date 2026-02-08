<template>
  <div class="terms-page">
    <div class="app-header">
      <h1>Terms of Service</h1>
      <div class="header-actions">
        <router-link to="/" class="header-link">
          <el-button type="primary" text>
            <el-icon><ArrowLeft /></el-icon>
            Back to Google Drive
          </el-button>
        </router-link>
      </div>
    </div>

    <div class="terms-content">
      <p class="intro">
        These Terms of Service (“Terms”) govern your access to and use of
        <strong>DWG Viewer for Google Drive</strong> (“the Service”). By using the Service, you agree to these Terms
        and acknowledge having read our <router-link to="/privacy">Privacy Policy</router-link>. If you do not agree,
        please do not use the Service.
      </p>

      <section>
        <h2>1. Definitions</h2>
        <p>
          <strong>“Service”</strong> means the DWG Viewer for Google Drive application that allows you to view DWG and
          DXF files from your Google Drive. <strong>“You”</strong> and <strong>“Your”</strong> refer to the person or
          entity using the Service. <strong>“We”</strong>, <strong>“Us”</strong>, and <strong>“Our”</strong> refer to the
          provider of the Service.
        </p>
      </section>

      <section>
        <h2>2. Description of the Service</h2>
        <p>
          Subject to your compliance with these Terms, we grant you a limited, non-exclusive, revocable license to use
          the Service for viewing DWG and DXF files from your Google Drive. The Service provides:
        </p>
        <ul>
          <li>Authentication with your Google account to access your Google Drive</li>
          <li>Listing and selection of DWG/DXF files from your Drive</li>
          <li>In-browser viewing of selected files (file content is processed locally in your browser and is not stored on our servers)</li>
          <li>Optional local file viewing for DWG/DXF files on your device</li>
        </ul>
        <p>
          We may modify, suspend, or discontinue any part of the Service at any time. Your continued use of the Service
          after changes constitutes acceptance of those changes.
        </p>
      </section>

      <section>
        <h2>3. Your Obligations</h2>
        <p>You agree to:</p>
        <ul>
          <li>Use the Service only in accordance with these Terms and applicable laws</li>
          <li>Not reverse engineer, decompile, or attempt to extract the source code of the Service (except as permitted by law)</li>
          <li>Not use the Service to store or transmit malicious code, or to gain unauthorized access to any system or data</li>
          <li>Not use the Service in any way that infringes the rights of others or violates privacy or intellectual property rights</li>
          <li>Keep your Google account credentials secure and notify us of any unauthorized use of your account</li>
        </ul>
        <p>
          You are responsible for all activity that occurs through your use of the Service. We are not responsible for
          the accuracy or legality of any content you access or view through the Service.
        </p>
      </section>

      <section>
        <h2>4. Third-Party Services</h2>
        <p>
          The Service uses Google APIs (including the Google Drive API). Your use of the Service is also subject to
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Google’s Terms of Service</a>
          and
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s Privacy Policy</a>.
          We do not control Google’s services and are not responsible for their availability or your compliance with
          their terms.
        </p>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          Except for the limited license granted above, all rights in the Service (including software, design, and
          branding) remain with us. You retain all rights to your own data and files. We do not claim ownership of any
          content you view or store in Google Drive or on your device.
        </p>
      </section>

      <section>
        <h2>6. Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
          INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL
          COMPONENTS. YOUR USE OF THE SERVICE IS AT YOUR OWN RISK.
        </p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE (AND OUR AFFILIATES, DIRECTORS, EMPLOYEES, AND AGENTS) SHALL NOT
          BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF
          PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY
          FOR ANY CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE
          TWELVE (12) MONTHS PRECEDING THE CLAIM (OR, IF THE SERVICE IS PROVIDED FREE OF CHARGE, ONE HUNDRED U.S.
          DOLLARS).
        </p>
      </section>

      <section>
        <h2>8. Changes to These Terms</h2>
        <p>
          We may amend these Terms from time to time. We will post the updated Terms on this page and update the
          “Effective Date.” Your continued use of the Service after the effective date of any changes constitutes your
          acceptance of the revised Terms. If you do not agree, you must stop using the Service.
        </p>
      </section>

      <section>
        <h2>9. Termination</h2>
        <p>
          You may stop using the Service at any time. We may suspend or terminate your access to the Service at any
          time, with or without notice, for any reason, including if we believe you have violated these Terms.
        </p>
      </section>

      <section>
        <h2>10. Contact</h2>
        <p>
          If you have questions about these Terms, please contact us at the email or address provided in the application
          or on the project repository.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
</script>

<style scoped>
.terms-page {
  min-height: 100vh;
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

.terms-content {
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
  .terms-content {
    margin-left: 12px;
    margin-right: 12px;
    padding: 24px 20px;
  }

  .app-header h1 {
    font-size: 1.25rem;
  }
}
</style>
