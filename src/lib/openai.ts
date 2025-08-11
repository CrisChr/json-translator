import { OpenAI } from "openai";
import {decrypt} from './utils'

export async function translate(
  json: string,
  targetLang: string,
  apiKey: string,
  signal: AbortSignal,
  onProgress: (progress: number) => void,
  onStream: (content: string) => void
): Promise<string | null> {

  const openai = new OpenAI({
    baseURL: "https://api.openai.com/v1",
    apiKey,
  });

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a professional JSON translator. Your task is to translate the given JSON object into ${targetLang}. Please maintain the original JSON structure and only translate the string values. Do not translate the keys. Return only the translated JSON object as a string, without any additional text or explanations.`,
      },
      {
        role: "user",
        content: json,
      },
    ],
    stream: true,
  });

  let translatedContent = "";
  const estimatedTokens = json.length / 4; // 估算总 token 数
  let receivedTokens = 0;

  for await (const chunk of stream) {
    if (signal.aborted) {
      stream.controller.abort();
      return null;
    }
    const content = chunk.choices[0]?.delta?.content || "";
    translatedContent += content;
    receivedTokens += content.length / 4;
    
    const progress = Math.min(Math.round((receivedTokens / estimatedTokens) * 100), 100);
    onProgress(progress);

    onStream(content);
  }

  return translatedContent;
}

export async function validateApiKey(apiKey: string): Promise<void> {
  const openai = new OpenAI({
    baseURL: "https://api.openai.com/v1",
    apiKey: decrypt(apiKey),
  });
  try {
    await openai.models.list();
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("Invalid or expired API Key");
      } else if (error.response.status === 429) {
        throw new Error("API call limit reached");
      }
    }
    throw new Error("API Key validation failed");
  }
}
