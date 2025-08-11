import Anthropic from "@anthropic-ai/sdk";
import {decrypt} from './utils'

export async function translate(
  json: string,
  targetLang: string,
  apiKey: string,
  signal: AbortSignal,
  onProgress: (progress: number) => void,
  onStream: (content: string) => void
): Promise<string | null> {

  const decryptedApiKey = decrypt(apiKey)


  const anthropic = new Anthropic({
    apiKey: decryptedApiKey,
    baseURL: "https://api.gptsapi.net",
  });

  const stream = await anthropic.messages.stream({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `You are a professional JSON translator. Your task is to translate the given JSON object into ${targetLang}. Please maintain the original JSON structure and only translate the string values. Do not translate the keys. Return only the translated JSON object as a string, without any additional text or explanations. The JSON to translate is: ${json}`,
      },
    ],
  });

  let translatedContent = "";
  const estimatedTokens = json.length / 4; // 估算总 token 数
  let receivedTokens = 0;

  for await (const chunk of stream) {
    if (signal.aborted) {
      // How to abort an Anthropic stream is not documented, so we just break
      break;
    }
    if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
        const content = chunk.delta.text;
        translatedContent += content;
        receivedTokens += content.length / 4;

        const progress = Math.min(Math.round((receivedTokens / estimatedTokens) * 100), 100);
        onProgress(progress);

        onStream(content);
    }
  }

  if (signal.aborted) return null;

  return translatedContent;
}

export async function validateApiKey(apiKey: string): Promise<void> {
    const anthropic = new Anthropic({
      apiKey: decrypt(apiKey),
    });
    try {
        await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 1,
            messages: [{ role: "user", content: "test" }],
        });
    } catch (error: any) {
        if (error.status === 401) {
            throw new Error("Invalid or expired API Key");
        }
        throw new Error("API Key validation failed");
    }
}
