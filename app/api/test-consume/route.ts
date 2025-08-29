import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 创建Supabase客户端（服务端）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 测试API被调用');
    
    // 测试数据库连接
    const { data: testData, error: testError } = await supabase
      .from('gemini_flash_credit_transactions')
      .select('*')
      .limit(5);

    if (testError) {
      console.error('❌ 数据库连接测试失败:', testError);
      return NextResponse.json({
        success: false,
        error: '数据库连接失败',
        details: testError
      });
    }

    // 测试插入一条测试记录
    const testTransaction = {
      user_id: 'test-user-id',
      amount: -15,
      type: 'TEST',
      description: '测试交易记录',
      reference_id: `test_${Date.now()}`,
      metadata: { test: true, timestamp: new Date().toISOString() }
    };

    const { data: insertData, error: insertError } = await supabase
      .from('gemini_flash_credit_transactions')
      .insert(testTransaction)
      .select();

    if (insertError) {
      console.error('❌ 插入测试记录失败:', insertError);
      return NextResponse.json({
        success: false,
        error: '插入测试记录失败',
        details: insertError,
        existingData: testData
      });
    }

    // 删除测试记录
    const { error: deleteError } = await supabase
      .from('gemini_flash_credit_transactions')
      .delete()
      .eq('reference_id', testTransaction.reference_id);

    if (deleteError) {
      console.error('⚠️ 删除测试记录失败:', deleteError);
    }

    return NextResponse.json({
      success: true,
      message: '测试成功',
      existingData: testData,
      insertTest: insertData,
      deleteTest: deleteError ? '失败' : '成功'
    });

  } catch (error) {
    console.error('❌ 测试API失败:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    });
  }
}
