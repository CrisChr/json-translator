import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  const { provider } = params;

  try {
    // 动态导入对应的翻译模块
    let translateModule: any;
    switch (provider) {
      case 'openai':
        translateModule = await import('@/lib/openai');
        break;
      case 'claude':
        translateModule = await import('@/lib/claude');
        break;
      case 'deepseek':
        translateModule = await import('@/lib/deepseek');
        break;
      case 'google':
        translateModule = await import('@/lib/google');
        break;
      default:
        return NextResponse.json({ error: 'Unsupported AI provider' }, { status: 400 });
    }

    const { json, targetLang, apiKey } = await request.json(); // 已加密的apiKey

    if (!json || !targetLang || !apiKey) {
      return NextResponse.json({ error: 'Missing required parameters: json, targetLang, or apiKey' }, { status: 400 });
    }
    const dcryptedApiKey = decrypt(apiKey); // 解密 API Key

    // 创建 AbortController 用于取消请求
    const abortController = new AbortController();
    const signal = abortController.signal;

    // 设置正确的流式响应头
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'text/event-stream; charset=utf-8');
    responseHeaders.set('Cache-Control', 'no-cache');
    responseHeaders.set('Connection', 'keep-alive');
    responseHeaders.set('X-Content-Type-Options', 'nosniff');

    // 直接调用翻译函数，它现在会返回一个可读流
    const stream = await translateModule.translate(
      json,
      targetLang,
      dcryptedApiKey,
      signal,
      () => {}, // onProgress (在代理中忽略)
      () => {}  // onStream (在代理中忽略)
    );

    // 确保返回的是一个有效的 ReadableStream
    if (stream instanceof ReadableStream) {
      // 如果是 Google，我们需要解析 SSE 流
      if (provider === 'google') {
        const transformStream = new TransformStream({
          transform(chunk, controller) {
            const text = new TextDecoder().decode(chunk);
            // 简单的 SSE 解析：寻找 "text": "..."
            const lines = text.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const json = JSON.parse(line.substring(6));
                  if (json.candidates && json.candidates[0].content.parts[0].text) {
                    controller.enqueue(new TextEncoder().encode(json.candidates[0].content.parts[0].text));
                  }
                } catch (e) {
                  // 忽略无法解析的行
                }
              }
            }
          }
        });
        return new NextResponse(stream.pipeThrough(transformStream), { headers: responseHeaders });
      }
      return new NextResponse(stream, { headers: responseHeaders });
    } else {
      // 如果 translate 函数没有返回预期的流，则返回错误
      console.error('Translation did not return a valid stream.');
      return NextResponse.json({ error: 'Failed to get a valid translation stream.' }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Proxy API error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// 对于 GET 请求，可以返回一个简单的信息或不支持
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'GET requests are not supported for this proxy. Use POST for translation.' }, { status: 405 });
}
