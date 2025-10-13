import PageLayout from '@/components/PageLayout'

export default async function AboutPage({ params: { lang } }: { params: { lang: string } }) {

  return (
    <PageLayout title="About Us">
      <p>
        Welcome to JSON Translater, a tool born to solve one of the most common and tedious problems for developers in multilingual projects - i18n (internationalization) JSON file translation.
      </p>
      <h2>Our Mission</h2>
      <p>
        As developers, we know how painful it is to manually manage and translate JSON files when dealing with multilingual applications. Copying, pasting, switching between different files, worrying about breaking the structure... these repetitive tasks are not only time-consuming but also prone to errors. We believe that developers' valuable time should be spent on creating more valuable features, not tied down by these chores.
      </p>
      <p>
        Therefore, we decided to create a simple, efficient, and secure solution. A tool that can leverage the powerful capabilities of AI to automate the entire translation process. And so, JSON Translater was born.
      </p>
      <h2>Our Vision</h2>
      <p>
        Our vision is to become the go-to tool for developers worldwide for software localization. We are committed to:
      </p>
      <ul>
        <li><strong>Ultimate Simplicity</strong>: Providing the most intuitive user experience, making JSON translation as simple as uploading a file and clicking a button.</li>
        <li><strong>Absolute Security</strong>: Adhering to the principle that all operations are performed locally in the browser, ensuring that users' code and data privacy are never compromised.</li>
        <li><strong>Professional Accuracy</strong>: Utilizing top-tier AI translation models to ensure that the translation results are not only accurate but also consistent with professional terminology and language habits.</li>
      </ul>
      <p>
        We are a small team of passionate developers dedicated to solving real-world problems with code. If you have any suggestions or feedback for this tool, or would like to see more features, please feel free to contact us through our GitHub.
      </p>
      <p>
        Thank you for using our tool!
      </p>
    </PageLayout>
  );
}
