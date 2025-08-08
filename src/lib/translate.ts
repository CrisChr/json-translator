import { useTranslate } from "@/context/TranslateContext";

type TranslateFunction = (
  json: string,
  targetLang: string,
  apiKey: string,
  signal: AbortSignal,
  onProgress: (progress: number) => void,
  onStream: (content: string) => void
) => Promise<string | null>;

type ValidateApiKeyFunction = (apiKey: string) => Promise<void>;

export const getTranslationFunctions = (provider: string): { translate: TranslateFunction, validateApiKey: ValidateApiKeyFunction } => {
  switch (provider) {
    case 'deepseek':
      return require('./deepseek');
    case 'openai':
      return require('./openai');
    case 'google':
      return require('./google');
    case 'claude':
      return require('./claude');
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
};
