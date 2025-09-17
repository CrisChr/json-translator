import { getDictionary } from '@/lib/getDictionary'
import PageLayout from '@/components/PageLayout'

export default async function TermsPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)

  return (
    <PageLayout title={'Terms of Service'}>
      <p><strong>Last Updated: October 26, 2023</strong></p>

      <p>
        Welcome to JSON Translater! Before using our services, please read the following terms of service carefully. By accessing or using this website, you agree to be bound by these terms.
      </p>

      <h2>Service Description</h2>
      <p>
        JSON Translater provides a browser-based AI translation tool designed to help users translate i18n JSON files. This service is provided on an "as is" and "as available" basis. We do not guarantee that the service will be uninterrupted, timely, secure, or error-free.
      </p>

      <h2>User Responsibilities</h2>
      <p>
        You agree and understand that:
      </p>
      <ul>
        <li>You are solely responsible for the content you translate using this service.</li>
        <li>You are responsible for obtaining and managing your own API keys from third-party AI service providers.</li>
        <li>You are responsible for protecting your API key. As this tool runs locally in your browser, we do not have access to your key and cannot be held responsible for its security.</li>
        <li>You may not use this service for any illegal or unauthorized activities.</li>
      </ul>

      <h2>Disclaimer</h2>
      <p>
        This tool relies on third-party AI translation services. We make no express or implied warranties regarding the accuracy, reliability, or suitability of the translation content provided by these third-party services. We are not liable for any direct or indirect losses resulting from the use of the translation results.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        This website and its original content and features are protected by copyright, trademark, and other intellectual property laws.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Any changes will be posted on this page. Your continued use of the website after any changes to the terms constitutes your acceptance of the new terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about these Terms of Service, please contact us through our GitHub repository.
      </p>
    </PageLayout>
  );
}
