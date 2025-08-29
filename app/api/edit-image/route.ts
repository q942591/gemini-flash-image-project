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
      },
    });

    // 添加调试信息
    console.log('🔍 调试信息:');
    console.log('  API密钥存在:', !!process.env.OPENROUTER_API_KEY);
    console.log('  API密钥长度:', process.env.OPENROUTER_API_KEY?.length);
    console.log('  API密钥前缀:', process.env.OPENROUTER_API_KEY?.substring(0, 20));
    console.log('  OpenAI客户端配置:', {
      baseURL: openai.baseURL,
      hasApiKey: !!openai.apiKey,
      apiKeyLength: openai.apiKey?.length
    });

    const { imageUrl, prompt } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ 
        error: '图片URL是必需的',
        details: '请提供有效的图片URL'
      }, { status: 400 });
    }

    if (!prompt) {
      return NextResponse.json({ 
        error: '编辑提示词是必需的',
        details: '请提供图片编辑的提示词'
      }, { status: 400 });
    }

    console.log('  📸 图片URL:', imageUrl);
    console.log('  📝 提示词:', prompt);

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

    // 构建图片编辑提示词 - 使用更直接的指令
    const editPrompt = `请编辑这张图片：${prompt}

重要：请直接返回编辑后的图片，不要返回任何文字描述。`;

    console.log('  🚀 准备调用OpenAI API...');
    console.log('  📋 完整提示词:', editPrompt);

    try {
      // 首先尝试使用Gemini 2.5 Flash Image
      console.log('  🔍 尝试使用 Gemini 2.5 Flash Image 模型...');
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NODE_ENV === 'production' 
            ? "https://www.geminiflashimage.cc" 
            : "http://localhost:3000",
          'X-Title': 'Gemini Flash Image'
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            {
              "role": "user",
              "content": [
                {
                  "type": "text",
                  "text": editPrompt
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
          max_tokens: 4096,
          temperature: 0.1, // 降低温度以获得更一致的编辑结果
          modalities: ["image", "text"], // 明确指定需要图像和文本输出
          stream: false, // 确保不使用流式响应
          n: 1, // 只生成一个响应
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('  ❌ Gemini 2.5 Flash Image API调用失败:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        });
        
        // 尝试使用备用模型
        console.log('  🔄 尝试使用备用模型...');
        const fallbackResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NODE_ENV === 'production' 
              ? "https://www.geminiflashimage.cc" 
              : "http://localhost:3000",
            'X-Title': 'Gemini Flash Image'
          },
          body: JSON.stringify({
            model: "anthropic/claude-3.5-sonnet", // 备用模型
            messages: [
              {
                "role": "user",
                "content": [
                  {
                    "type": "text",
                    "text": editPrompt
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
            max_tokens: 4096,
            temperature: 0.1,
            stream: false,
            n: 1,
          })
        });
        
        if (!fallbackResponse.ok) {
          const fallbackErrorText = await fallbackResponse.text();
          throw new Error(`备用模型API调用也失败: ${fallbackResponse.status} - ${fallbackErrorText}`);
        }
        
        // 使用备用模型的响应
        const fallbackData = await fallbackResponse.json();
        console.log('  ✅ 备用模型API调用成功!');
        
        // 处理备用模型的响应
        const fallbackResult = fallbackData.choices?.[0]?.message?.content;
        if (fallbackResult && fallbackResult.length > 100) {
          return NextResponse.json({
            success: true,
            editedImageData: fallbackResult,
            message: '图片编辑完成（使用备用模型）',
            usage: fallbackData.usage
          });
        }
        
        throw new Error(`备用模型也无法生成图片: ${fallbackResult}`);
      }

      const data = await response.json();
      console.log('  ✅ OpenRouter API调用成功!');
      console.log('  📊 完整响应数据:', JSON.stringify(data, null, 2));
      
      if (data.choices && data.choices.length > 0) {
        const message = data.choices[0].message;
        console.log('  📄 Message对象:', message);
        console.log('  📄 Content类型:', typeof message.content);
        console.log('  📄 Content内容:', message.content);
        console.log('  🖼️ Images数组:', message.images);
        
        // 首先检查 images 数组（Gemini 2.5 Flash Image 的图片在这里）
        if (message.images && Array.isArray(message.images) && message.images.length > 0) {
          console.log('  🎉 找到 images 数组，长度:', message.images.length);
          
          const imageItem = message.images[0];
          console.log('  🖼️ 第一个图片项:', imageItem);
          
          if (imageItem.type === 'image_url' && imageItem.image_url && imageItem.image_url.url) {
            console.log('  🎯 找到图片URL:', imageItem.image_url.url);
            
            return NextResponse.json({
              success: true,
              message: '图片编辑成功！',
              editedImageData: imageItem.image_url.url,
              usage: data.usage
            }, { status: 200 });
          }
        }
        
        const content = message.content;
        
        // 检查返回的内容类型
        if (Array.isArray(content)) {
          console.log('  📄 Content 是数组，长度:', content.length);
          content.forEach((item, index) => {
            console.log(`  📄 Content[${index}]:`, item);
          });
          
          // 查找图片内容
          const imageContent = content.find(item => item.type === 'image_url');
          if (imageContent && imageContent.image_url) {
            console.log('  🎯 找到图片内容:', imageContent);
            
            return NextResponse.json({
              success: true,
              message: '图片编辑成功！',
              editedImageData: imageContent.image_url.url,
              usage: data.usage
            }, { status: 200 });
          }
        } else if (typeof content === 'string') {
          console.log('  📄 Content 是字符串，长度:', content.length);
          console.log('  📄 Content 预览:', content.substring(0, 200));
          
          // 如果是字符串，可能是图片URL或base64
          if (content.startsWith('data:image/')) {
            console.log('  🎯 检测到标准base64图片数据');
            return NextResponse.json({
              success: true,
              message: '图片编辑成功！',
              editedImageData: content,
              usage: data.usage
            }, { status: 200 });
          } else if (content.startsWith('http')) {
            console.log('  🎯 检测到HTTP图片URL');
            return NextResponse.json({
              success: true,
              message: '图片编辑成功！',
              editedImageData: content,
              usage: data.usage
            }, { status: 200 });
          } else if (content.length > 100) {
            // 长字符串，可能是base64图片数据（没有data:image/前缀）
            console.log('  🔍 检测到长字符串，可能是base64图片数据');
            const imageData = `data:image/jpeg;base64,${content}`;
            return NextResponse.json({
              success: true,
              message: '图片编辑成功！',
              editedImageData: imageData,
              usage: data.usage
            }, { status: 200 });
          }
        }
        
        // 如果没有找到图片，检查是否有文本内容
        if (typeof content === 'string' && content.trim()) {
          console.log('  ⚠️ API返回了文本内容，但没有图片');
          return NextResponse.json({
            success: false,
            error: 'Gemini只返回了文字描述，没有生成图片。请尝试重新提交或使用不同的描述。',
            textResponse: content,
            usage: data.usage
          }, { status: 500 });
        }
        
        console.log('  ❌ 没有找到任何内容');
        return NextResponse.json({
          success: false,
          error: 'API没有返回任何内容',
          usage: data.usage
        }, { status: 500 });
      } else {
        throw new Error('OpenRouter API 响应格式错误：没有找到 choices');
      }

    } catch (openaiError) {
      console.error('  ❌ OpenAI API调用失败:', openaiError);
      
      // 如果OpenAI SDK失败，尝试手动HTTP请求
      try {
        console.log('  🔄 尝试手动HTTP请求...');
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NODE_ENV === 'production' 
              ? "https://www.geminiflashimage.cc" 
              : "http://localhost:3000",
            'X-Title': 'Gemini Flash Image'
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image-preview",
            messages: [
              {
                "role": "user",
                "content": [
                  {
                    "type": "text",
                    "text": editPrompt
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
            max_tokens: 4096,
            temperature: 0.1,
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`手动HTTP请求失败: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('  ✅ 手动HTTP请求成功!');
        console.log('  📊 响应数据:', data);

        const result = data.choices[0]?.message?.content;

        if (result && (result.includes('data:image/') || result.includes('http'))) {
          return NextResponse.json({
            success: true,
            editedImageData: result,
            prompt: prompt,
            usage: data.usage,
            message: '图片编辑完成（手动HTTP请求）'
          });
        } else {
          return NextResponse.json({
            success: false,
            error: '模型返回的是文字描述而不是编辑后的图片',
            details: '请检查提示词格式和图片格式',
            result: result,
            code: 'TEXT_INSTEAD_OF_IMAGE'
          }, { status: 400 });
        }
      } catch (httpError) {
        console.error('  ❌ 手动HTTP请求也失败:', httpError);
        throw httpError;
      }
    }

  } catch (error) {
    console.error('❌ 图片编辑错误:', error);
    
    // 改进错误处理
    if (error instanceof Error) {
      console.error('❌ 错误类型:', error.constructor.name);
      console.error('❌ 错误消息:', error.message);
      
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
      
      if (error.message.includes('No auth credentials found')) {
        return NextResponse.json({ 
          error: 'API认证失败',
          details: 'OpenRouter API密钥无效或已过期，请检查配置',
          code: 'AUTH_FAILED',
          debug: {
            hasKey: !!process.env.OPENROUTER_API_KEY,
            keyLength: process.env.OPENROUTER_API_KEY?.length,
            keyPrefix: process.env.OPENROUTER_API_KEY?.substring(0, 20)
          }
        }, { status: 401 });
      }
      
      return NextResponse.json({ 
        error: '图片编辑失败',
        details: error.message,
        code: 'EDIT_FAILED'
      }, { status: 500 });
    }
    
    // 处理其他类型的错误
    const errorObj = error as any;
    console.error('❌ 错误状态:', errorObj.status);
    console.error('❌ 错误代码:', errorObj.code);
    
    return NextResponse.json({ 
      error: '未知错误',
      details: '图片编辑过程中出现未知错误',
      code: 'UNKNOWN_ERROR'
    }, { status: 500 });
  }
}