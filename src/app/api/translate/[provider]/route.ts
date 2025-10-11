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

    const { json, targetLang, apiKey } = await request.json();

    if (!json || !targetLang || !apiKey) {
      return NextResponse.json({ 
        error: 'Missing required parameters: json, targetLang, or apiKey' 
      }, { status: 400 });
    }

    const decryptedApiKey = decrypt(apiKey);

    // 创建 AbortController
    const abortController = new AbortController();
    const signal = abortController.signal;

    // 设置流式响应头
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'text/event-stream; charset=utf-8');
    responseHeaders.set('Cache-Control', 'no-cache');
    responseHeaders.set('Connection', 'keep-alive');
    responseHeaders.set('X-Content-Type-Options', 'nosniff');

    // 创建一个可读流来传输翻译内容
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 调用翻译函数，使用 onStream 回调实时推送内容
          await translateModule.translate(
            json,
            targetLang,
            decryptedApiKey,
            signal,
            (progress: number) => {
              // 进度回调 - 在流式场景中可以忽略
            },
            (chunk: string) => {
              // 流式内容回调 - 实时推送给前端
              try {
                controller.enqueue(new TextEncoder().encode(chunk));
              } catch (e) {
                console.error('Error enqueueing chunk:', e);
              }
            }
          );

          // 翻译完成，关闭流
          controller.close();
        } catch (error: any) {
          console.error('Translation error:', error);
          controller.error(error);
        }
      },
      cancel() {
        // 用户取消请求时触发
        abortController.abort();
      }
    });

    return new NextResponse(stream, { headers: responseHeaders });

  } catch (error: any) {
    console.error('Proxy API error:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'GET requests are not supported for this proxy. Use POST for translation.' 
  }, { status: 405 });
}
