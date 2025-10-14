const apiKeySecurityMarkdown = `

# API Key Security Best Practices: Why Your Keys Are Safe With Us

Your API keys are the keys to your kingdom—they grant access to powerful AI services and are tied to your accounts. Protecting them is paramount. This guide explains why API key security is so important and details how our tool is architected to ensure your keys are never at risk.

## Why API Key Security Matters

An API key is a secret token that authenticates your requests to a service provider like OpenAI or Google. If a malicious actor gets hold of your key, they could:

*   **Use your paid services**, potentially racking up huge bills on your account.
*   **Abuse the service** in a way that gets your account banned.
*   **Access sensitive data** if the key has broad permissions.

This is why you should **never** share your keys, commit them to public code repositories (like GitHub), or embed them directly in client-side code that is visible to end-users.

## Our Security Promise: We Never See Your Keys

The fundamental principle of our tool's security model is simple: **your sensitive data never touches our servers.**

#### 1. Purely Client-Side Operations

Everything our tool does happens locally in your web browser.

*   **File Processing:** When you upload a JSON file, it is loaded directly into your browser's memory. It is **not** uploaded to a remote server.
*   **API Key Storage:** When you enter your API key, it is stored **only** in the current browser session. It is not saved, logged, or transmitted to our servers in any way.
*   **API Requests:** API calls to AI providers are made **directly from your browser** to their servers (e.g., to \`api.openai.com\`). We do not act as a proxy or middleman. This ensures that the only parties that ever see your key are you and the AI provider.

#### 2. No Data Retention

The moment you close your browser tab, all the data from your session is gone forever. This includes:

*   The content of your JSON files.
*   The API keys you entered.

We do not have a database to store user data, because we believe the most secure data is the data you never collect in the first place.

## Best Practices for You

While our tool is designed to be secure, here are a few best practices you should always follow:

*   **Use Restricted Keys:** If your AI provider allows it, create API keys with limited permissions or usage quotas specifically for use with tools like ours.
*   **Monitor Your Usage:** Regularly check your usage dashboard on the AI provider's website to spot any unexpected activity.
*   **Rotate Your Keys:** Periodically regenerate your API keys to limit the window of opportunity for a compromised key.

By understanding and respecting the importance of API key security, we've built a tool that allows you to leverage the power of AI translation with confidence and peace of mind.

`

export default apiKeySecurityMarkdown
