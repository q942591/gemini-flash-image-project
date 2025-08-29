import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// 强制动态路由
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // 检查API密钥是否存在
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ 
        error: 'OpenRouter API key is not configured',
        details: 'Please set OPENROUTER_API_KEY in your .env.local file'
      }, { status: 500 });
    }

    // 在函数内部创建OpenAI客户端，确保环境变量已加载
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": process.env.NODE_ENV === 'production' 
          ? "https://www.geminiflashimage.cc" 
          : "http://localhost:3000",
        "X-Title": "Gemini Flash Image",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    });

    const { imageUrl, prompt } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ 
        error: '图片URL是必需的',
        details: '请提供有效的图片URL'
      }, { status: 400 });
    }

    // 验证URL格式
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json({ 
        error: '无效的图片URL格式',
        details: '请提供有效的URL'
      }, { status: 400 });
    }

    // 检查是否是blob URL
    if (imageUrl.startsWith('blob:')) {
      return NextResponse.json({ 
        error: '不支持blob URL',
        details: '请先将图片上传到服务器'
      }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt || "请分析这张图片并详细描述其内容。"
            },
            {
              "type": "image_url",
              "image_url": {
                "url": imageUrl
              }
            }
          ]
        }
      ],
    });

    const result = completion.choices[0]?.message?.content;

    return NextResponse.json({
      success: true,
      result: result,
      usage: completion.usage
    });

  } catch (error) {
    console.error('图片分析错误:', error);
    
    // 改进错误处理
    if (error instanceof Error) {
      // 检查是否是OpenAI API错误
      if (error.message.includes('Failed to extract')) {
        return NextResponse.json({ 
          error: '图片无法被解析，请检查图片格式是否正确',
          details: '支持的格式：JPG, PNG, WebP, 图片大小不超过20MB',
          code: 'IMAGE_EXTRACTION_FAILED'
        }, { status: 400 });
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json({ 
          error: 'API请求频率过高，请稍后再试',
          details: error.message,
          code: 'RATE_LIMIT_EXCEEDED'
        }, { status: 429 });
      }
      
      return NextResponse.json({ 
        error: '图片分析失败',
        details: error.message,
        code: 'ANALYSIS_FAILED'
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      error: '未知错误',
      details: '图片分析过程中出现未知错误',
      code: 'UNKNOWN_ERROR'
    }, { status: 500 });
  }
}
