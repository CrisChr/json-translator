import { getDictionary } from '@/lib/getDictionary'
import PageLayout from '@/components/PageLayout'

export default async function PrivacyPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)

  return (
    <PageLayout title="Privacy Policy">
      <p><strong>Last Updated: October 26, 2024</strong></p>
      
      <p>
        Welcome to JSON Translater! We highly value your privacy. This Privacy Policy is intended to explain how we handle your information and to assure you that your data is absolutely secure with us.
      </p>

      <h2>We Do Not Collect Any Personal Information</h2>
      <p>
        The core design principle of JSON Translater is "Privacy First." We are proud to state that we do not collect, store, transmit, or share any personally identifiable information (PII) with third parties.
      </p>
      <ul>
        <li><strong>No Registration Required</strong>: You do not need to create an account or provide any personal information to use our services.</li>
        <li><strong>No Cookie Tracking</strong>: We do not use cookies or similar technologies to track your personal browsing behavior.</li>
      </ul>

      <h2>Your Data is Processed Entirely Locally</h2>
      <p>
        This is the cornerstone of our privacy commitment. All data you upload when using our tool, including:
      </p>
      <ul>
        <li><strong>JSON file content</strong></li>
        <li><strong>Your API key</strong></li>
      </ul>
      <p>
        <strong>is processed entirely locally in your browser.</strong> This information is never uploaded to our servers. When you close your browser tab, all related data is cleared.
      </p>

      <h2>Communication with Third-Party Services</h2>
      <p>
        To provide AI translation functionality, your browser communicates directly with the official API of the AI service provider you choose (e.g., OpenAI, Google Gemini, etc.). Your API key and the text to be translated are sent directly to them. As the tool provider, we do not participate in, proxy, or monitor this process.
      </p>
      <p>
        We recommend that you review the privacy policies of the respective AI service providers to understand how they handle your data.
      </p>

      <h2>Policy Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page. We encourage you to review this page periodically to stay informed about our efforts to protect your privacy.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us through our GitHub repository.
      </p>
    </PageLayout>
  );
}
