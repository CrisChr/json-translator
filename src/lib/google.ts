import { GoogleGenerativeAI } from "@google/generative-ai";

export async function translate(
  json: string,
  targetLang: string,
  apiKey: string,
  signal: AbortSignal,
  onProgress: (progress: number) => void,
  onStream: (content: string) => void
): Promise<string | null> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const languageMap: { [key: string]: string } = {
    "en": "English",
    "ru": "Russian",
    "es": "Spanish",
    "de": "German",
    "tr": "Turkish",
    "fr": "French",
    "ja": "Japanese",
    "pt": "Portuguese",
    "zh": "Simplified Chinese",
    "zh-TW": "Traditional Chinese",
    "it": "Italian",
    "ar": "Arabic",
    "pl": "Polish",
    "el": "Greek",
    "nl": "Dutch",
    "id": "Bahasa Indonesia",
    "ko": "Korean",
    "th": "Thai",
    "vi": "Vietnamese"
  };

  const fullLangName = languageMap[targetLang] || targetLang;

  const prompt = `You are a professional JSON translator. Your task is to translate the given JSON object into ${fullLangName}. Please maintain the original JSON structure and only translate the string values. Do not translate the keys. Return only the translated JSON object as a string, without any additional text or explanations. The JSON to translate is: ${json}`;

  const result = await model.generateContentStream(prompt);

  let translatedContent = "";
  const estimatedTokens = json.length / 4; // 估算总 token 数
  let receivedTokens = 0;

  for await (const chunk of result.stream) {
    if (signal.aborted) {
      break;
    }
    const chunkText = chunk.text();
    translatedContent += chunkText;
    receivedTokens += chunkText.length / 4;

    const progress = Math.min(Math.round((receivedTokens / estimatedTokens) * 100), 100);
    onProgress(progress);
    
    onStream(translatedContent);
  }

  if (signal.aborted) return null;

  return translatedContent;
}

export async function validateApiKey(apiKey: string): Promise<void> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    await model.countTokens("test");
  } catch (error: any) {
    if (error.message.includes("API key not valid")) {
      throw new Error("Invalid or expired API Key");
    }
    throw new Error("API Key validation failed");
  }
}