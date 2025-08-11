

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
  const translate: TranslateFunction = async (json, targetLang, apiKey, signal, onProgress, onStream) => {
    const url = `/api/proxy/${provider}`;
    let translatedContent = "";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ json, targetLang, apiKey }), // 使用加密的API Key
        signal: signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Response body is empty.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (signal.aborted) {
          reader.cancel();
          return null;
        }

        const chunk = decoder.decode(value, { stream: true });
        translatedContent += chunk;
        onStream(translatedContent);
        // 代理层不提供细粒度进度，这里可以简单地模拟或移除
        onProgress(Math.min(translatedContent.length / json.length * 100, 100));
      }

      return translatedContent;

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Translation aborted by user.');
        return null;
      }
      console.error('Error during proxy translation:', error);
      throw error;
    }
  };

  const validateApiKey: ValidateApiKeyFunction = async (apiKey: string) => {
    // API Key 验证也通过代理服务进行，或者直接在代理服务中处理
    // 这里可以简单地调用一个代理验证端点，或者依赖翻译请求的成功来隐式验证
    // 为了简化，我们假设翻译请求的成功就是API Key有效的标志
    // 如果需要明确的验证，可以在proxy中添加一个 /api/proxy/[provider]/validate 路由
    // 目前，我们暂时不实现独立的validateApiKey代理，因为翻译请求会隐式验证
    // 如果翻译请求失败，会抛出错误，前端可以捕获
    console.warn("API Key validation is currently handled implicitly by the translation proxy. A dedicated validation endpoint is not yet implemented.");
    // 可以在这里添加一个简单的模拟，或者直接返回成功，让翻译请求去处理实际的验证
    // 更好的做法是，在proxy中添加一个validate路由
    // 为了不阻塞，暂时返回一个resolved Promise
    return Promise.resolve();
  };

  return { translate, validateApiKey };
};
