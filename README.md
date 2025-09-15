# JSON i18n Translation Tool

<p align="center">
  <img src="public/logo-blue.png" alt="JSON Translate Logo" width="200"/>
</p>

<p align="center">
  <strong>🌐 AI-Powered JSON Internationalization Translation Tool</strong>
</p>

<p align="center">
  <strong>🔗 <a href="https://jsontrans.fun/">jsontrans.fun</a></strong><br>
  Free online JSON translation tool powered by AI, supporting 40+ languages
</p>

<p align="center">
  <a href="/README.md">English</a> | 
  <a href="/README.zh.md">简体中文</a>
</p>

## ✨ Features

- 🤖 Smart translation powered by AI models
- 🔄 Maintains JSON structure integrity
- 🌍 Supports 40+ languages
- 🌐 Multi-language interface
- ⚡️ Real-time translation preview
- 🛡️ Local API key usage for security
- 📦 Export translation results
- 🎯 Accurate technical term translation
- 💻 Fully open source, transparent code

## 🚀 Quick Start

### Requirements

- Node.js >= 16.0.0
- npm or yarn or pnpm
- AI API key (Gemini, DeepSeek, OpenAI or Anthropic)

### Installation

```bash
git clone https://github.com/CrisChr/json-translator.git
```

```bash
cd json-translator
```

```bash
pnpm install
```

### Development

```bash
pnpm run dev
```
Visit http://localhost:3000 to view the development environment.

### Build

```bash
pnpm run build
```

```bash
pnpm run start
```

## 📖 Usage Guide

1. **Preparation**
   - Prepare your JSON file for translation
   - Get your AI API key (Gemini, DeepSeek, OpenAI or Anthropic)

2. **Getting Started**
   - Visit the website
   - Upload JSON file (drag & drop supported)
   - Select target language
   - Enter API key
   - Start translation

3. **Features**
   - Single JSON file translation
   - Real-time translation preview
   - Export in JSON format

## 💡 Best Practices

- Split large files into smaller ones for translation
- Verify JSON format before translation
- Use preview feature to confirm translation quality
- Regularly backup important translation files

## 🛠 Tech Stack

- **Development Tool**: 
  - Cursor (AI-assisted development)
- **Framework**: Next.js 14
- **UI**: 
  - React 18
  - Tailwind CSS
  - Radix UI
  - HeadlessUI
- **Language**: TypeScript
- **Libraries**:
  - JSZip (file handling)
  - React Syntax Highlighter
  - React Window (virtual list)

## 🤝 Contributing

I welcome all forms of contributions, whether it's new features, bug fixes, or documentation improvements.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Ensure code passes `npm run lint`
- Test functionality before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🙋 FAQ

**Q: Is the API key secure?**  
A: Yes. API keys are only used temporarily in the browser and are never saved or transmitted to servers.

**Q: Which languages are supported?**  
A: 40+ major languages including but not limited to:
- Chinese (Simplified/Traditional)
- English
- Japanese
- Korean
- French
- German
- Spanish
- Russian
etc.

**Q: Is there a file size limit?**  
A: Single files are limited to 10MB.


## 🌟 Acknowledgments

Thanks to all users who provided feedback. Special thanks to:

[@viggo](https://twitter.com/decohack), Based on the original project [json-translate](https://json.uiboy.com)

---

If this project helps you, please give it a star ⭐️!