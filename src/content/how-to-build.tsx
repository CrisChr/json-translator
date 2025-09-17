const howToBuildMarkdown = `

# Mastering i18n: How to Structure and Manage JSON Files for Multilingual Websites

Internationalization, or "i18n," is the process of designing software so it can be adapted to various languages and regions without engineering changes. For web developers, a huge part of i18n is managing "copy" or "strings" of text. Storing these strings in JSON files is a popular and effective method.

However, as a project grows, what starts as a simple \`\`\`en.json\`\`\` can quickly become a chaotic mess. A well-thought-out strategy for structuring and managing your JSON translation files is crucial for scalability, maintainability, and a smooth collaboration process with translators.

Let's dive into the best practices.

## 1. Choose a File Structure Strategy

There are two primary ways to organize your translation files. The best choice depends on the size and complexity of your application.

### Strategy A: One File Per Language (The Simple Start)

This is the most common approach for small to medium-sized projects. You simply create one JSON file for each language you support.

**Structure:**

\`\`\`js
/locales
├── en.json
├── es.json
└── fr.json
\`\`\`


**Example \`\`\`en.json\`\`\`:**
\`\`\`json
{
  "header.title": "My Awesome App",
  "header.nav.home": "Home",
  "header.nav.about": "About",
  "user.greeting": "Hello, welcome back!"
}
\`\`\`

- **Pros:** Simple to set up and understand.
- **Cons:** Files can become very large and difficult to navigate in big applications.

### Strategy B: Language Files Nested in Feature/Component Folders (The Scalable Approach)

For large applications, organizing translations by feature, page, or component is much more manageable. This prevents monolithic files and makes it easier for different teams to work on their respective parts of the app without conflicts.

**Structure:**

\`\`\`js
/locales
  ├── en
  │   ├── common.json
  │   ├── header.json
  │   └── profile.json
  └── es
      ├── common.json
      ├── header.json
      └── profile.json
\`\`\`

**Example \`\`\`en.json\`\`\`:**

\`\`\`json
{
  "title": "My Awesome App",
  "nav": {
    "home": "Home",
    "about": "About"
  }
}
\`\`\`

- **Pros:** Highly scalable, reduces merge conflicts, and makes finding keys intuitive.
- **Cons:** Requires a more sophisticated setup in your i18n library to load the necessary files (namespaces).

## 2. Establish a Clear Key Naming Convention

Inconsistent keys are a recipe for disaster. A solid naming convention provides context and prevents collisions. A popular and effective method is the **dot notation** that reflects the structure of your UI.

**Convention:** \`\`\`json page.section.element.state \`\`\`

- \`\`\`json login.form.submitButton.default \`\`\`: The default text for the submit button on the login form.
- \`\`\`json login.form.submitButton.loading \`\`\`: The text shown while the form is submitting.
- \`\`\`json common.error.network \`\`\`: A generic error message that can be reused.

Using a prefix like \`\`\`json common \`\`\` for shared strings (like "Save", "Cancel", "Error") is a great way to keep your translations DRY (Don't Repeat Yourself).

## 3. Plan for Pluralization and Interpolation

Language is complex. Your JSON structure needs to account for grammar rules like pluralization and dynamic data.

### Pluralization

Most i18n libraries (like \`\`\`json i18next \`\`\`) have built-in support for pluralization. You structure your keys to provide different strings for zero, one, or multiple items.

**Example:**

\`\`\`json
{
  "itemCount_zero": "No items",
  "itemCount_one": "{{count}} item",
  "itemCount_other": "{{count}} items"
}
\`\`\`

Your i18n library will automatically pick the correct key based on the \`\`\`json count \`\`\` variable you pass to it.

### Interpolation (Dynamic Values)

Your translations will often need to include dynamic data, like a user's name. Use a consistent placeholder format, such as double curly braces \`\`\`json {{variable}} \`\`\`.

**Example:**

\`\`\`json
{
  "welcomeMessage": "Hello, {{username}}!",
  "notifications": "You have {{count}} new messages."
}
  \`\`\`

## 4. Streamline the Translation Workflow

Finally, think about how you'll manage the process of getting your files translated.

1. **Source of Truth:** Designate one language (typically English) as the source of truth. New keys are always added to the English file first.
2. **Use Version Control:** Keep your \`\`\`json locales \`\`\` folder in Git. This gives you a history of all changes and a central place for collaboration.
3. **Consider an i18n Platform:** For serious projects, using a dedicated translation management platform (like Lokalise, Phrase, or Crowdin) can be a game-changer. These platforms provide UIs for translators, automate workflows, and integrate with your code repository.

## Conclusion

Managing i18n JSON files doesn't have to be a headache. By choosing a scalable file structure, enforcing consistent key naming conventions, and planning for linguistic complexities, you can build a robust and maintainable multilingual experience for all your users.
`;

export default howToBuildMarkdown;