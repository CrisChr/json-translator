const fullTranslationWorkflowMarkdown = `

# From Upload to Integration: A Complete JSON Translation Workflow with Our Tool

This guide will walk you through the entire process of translating a JSON file using our tool, from preparing your source file to integrating the translated files back into your project.

## Step 1: Prepare Your Source JSON File

Before you begin, a little preparation can go a long way. Ensure your source JSON file (e.g., \`en.json\`) is well-structured.

*   **Use Clear Keys:** Use descriptive keys that are easy to understand (e.g., \`"userProfile.title"\` instead of \`"up_t"\`).
*   **Check for Hardcoded Text:** Make sure all translatable text is in your JSON file, not hardcoded in your application.
*   **Validate Your JSON:** Ensure your file is a valid JSON to avoid parsing errors.

## Step 2: Upload Your File

Navigate to our tool's homepage. You can either drag and drop your source JSON file directly onto the upload area or click to browse and select the file from your computer.

## Step 3: Select Target Languages and Configure API Key

Once your file is uploaded, you'll see a list of available languages.

*   **Select Languages:** Check the boxes for all the languages you want to translate your file into. You can select multiple languages to translate them all at once.
*   **Choose AI Provider:** Select your preferred AI translation provider from the dropdown menu (e.g., Google Gemini, OpenAI).
*   **Enter API Key:** Securely enter your API key for the chosen provider. Remember, your key is only used in your browser and is never sent to our servers.

## Step 4: Start the Translation

Click the "Start Translation" button. Our tool will begin processing your file, sending the text values to the AI provider for translation. You can monitor the progress in real-time, seeing which languages are completed and which are in progress.

## Step 5: Review and Download

After the translation is complete, you have several options:

*   **Preview:** You can select any of the completed languages from a dropdown to preview the translated JSON content directly in the browser.
*   **Copy:** If you only need the content of a single file, you can use the "Copy" button to copy the entire translated JSON to your clipboard.
*   **Download Single File:** Click the "Download" button next to a specific language to download just that language's JSON file.
*   **Download All:** Use the "Download All" button to download a zip file containing all the translated JSON files, neatly named and ready to use.

## Step 6: Integrate into Your Project

The final step is to place the downloaded language files into your project's localization folder (often \`locales/\`, \`i18n/\`, or \`lang/\`).

For example, in a Next.js project, you might place \`de.json\`, \`fr.json\`, and \`es.json\` alongside your original \`en.json\`. Your i18n library (like \`next-intl\` or \`react-i18next\`) will then be able to automatically detect and use these new languages.

And that's it! You've successfully completed a full localization workflow, turning a single language file into a multilingual experience for your users.

`

export default fullTranslationWorkflowMarkdown
