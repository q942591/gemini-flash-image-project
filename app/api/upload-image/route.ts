import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 强制动态路由
export const dynamic = 'force-dynamic';

// 创建Supabase客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function POST(request: NextRequest) {
  try {
    // 检查环境变量
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ 
        error: 'Supabase配置缺失',
        details: '请检查环境变量配置'
      }, { status: 500 });
    }

    const { imageData, fileName } = await request.json();

    if (!imageData) {
      return NextResponse.json({ 
        error: '图片数据缺失',
        details: '请提供图片数据'
      }, { status: 400 });
    }

    // 从base64数据中提取MIME类型和实际数据
    const matches = imageData.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      return NextResponse.json({ 
        error: '图片格式错误',
        details: '请提供有效的base64图片数据'
      }, { status: 400 });
    }

    const [, mimeType, base64Data] = matches;
    
    // 验证MIME类型
    if (!mimeType.startsWith('image/')) {
      return NextResponse.json({ 
        error: '文件类型错误',
        details: '只支持图片文件'
      }, { status: 400 });
    }

    // 生成唯一的文件名
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileExtension = mimeType.split('/')[1];
    
    // 清理文件名，移除中文字符和特殊字符
    let cleanFileName = '';
    if (fileName) {
      // 移除文件扩展名
      const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
      // 只保留字母、数字、下划线和连字符
      cleanFileName = nameWithoutExt.replace(/[^a-zA-Z0-9_-]/g, '');
      // 如果清理后为空，使用默认名称
      if (!cleanFileName) {
        cleanFileName = 'image';
      }
    } else {
      cleanFileName = 'image';
    }
    
    // 确保文件名不超过100个字符（Supabase限制）
    if (cleanFileName.length > 50) {
      cleanFileName = cleanFileName.substring(0, 50);
    }
    
    // 确保文件名不以连字符或下划线开头
    cleanFileName = cleanFileName.replace(/^[-_]+/, '');
    
    const finalFileName = `${cleanFileName}_${timestamp}_${randomId}.${fileExtension}`;
    
    // 最终验证文件名长度（包括扩展名和时间戳）
    if (finalFileName.length > 200) {
      return NextResponse.json({ 
        error: '文件名过长',
        details: '生成的文件名超过长度限制',
        code: 'FILENAME_TOO_LONG'
      }, { status: 400 });
    }

    // 将base64转换为Buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // 上传到Supabase存储桶
    const { data, error } = await supabase.storage
      .from('gemini-images')
      .upload(finalFileName, buffer, {
        contentType: mimeType,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase上传错误:', error);
      console.error('尝试上传的文件名:', finalFileName);
      console.error('文件大小:', buffer.length, 'bytes');
      console.error('MIME类型:', mimeType);
      
      // 提供更友好的错误信息
      let errorMessage = '图片上传失败';
      let errorDetails = error.message;
      
      if (error.message.includes('Invalid key')) {
        errorMessage = '文件名格式无效';
        errorDetails = '文件名包含不被支持的字符，已自动清理';
      } else if (error.message.includes('File size')) {
        errorMessage = '文件过大';
        errorDetails = '文件大小超过存储桶限制';
      } else if (error.message.includes('Bucket not found')) {
        errorMessage = '存储桶不存在';
        errorDetails = '请检查gemini-images存储桶是否正确创建';
      }
      
      return NextResponse.json({ 
        error: errorMessage,
        details: errorDetails,
        code: 'UPLOAD_FAILED',
        debug: {
          attemptedFileName: finalFileName,
          fileSize: buffer.length,
          mimeType: mimeType
        }
      }, { status: 500 });
    }

    // 获取公共URL
    const { data: urlData } = supabase.storage
      .from('gemini-images')
      .getPublicUrl(finalFileName);

    return NextResponse.json({
      success: true,
      fileName: finalFileName,
      fileUrl: urlData.publicUrl,
      fileSize: buffer.length,
      mimeType: mimeType
    });

  } catch (error) {
    console.error('图片上传错误:', error);
    return NextResponse.json({ 
      error: '图片上传过程中出现错误',
      details: error instanceof Error ? error.message : '未知错误',
      code: 'UPLOAD_ERROR'
    }, { status: 500 });
  }
}
