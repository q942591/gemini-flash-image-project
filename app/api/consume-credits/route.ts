import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 创建Supabase客户端（服务端）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 图片处理消耗的积分数量
const PROCESSING_CREDITS_COST = 15;

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 积分扣除API被调用');
    console.log('- 环境变量检查:');
    console.log('  - NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '已设置' : '未设置');
    console.log('  - SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '已设置' : '未设置');
    console.log('  - NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '已设置' : '未设置');

    // 获取用户认证信息
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ 缺少用户认证信息');
      return NextResponse.json(
        { error: '缺少用户认证信息' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // 验证用户token并获取用户信息
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      console.log('❌ 用户认证失败:', authError);
      return NextResponse.json(
        { error: '用户认证失败' },
        { status: 401 }
      );
    }

    const userId = user.id;
    const userEmail = user.email || '';

    console.log('🔍 积分扣除API调试信息:');
    console.log('- 用户ID:', userId);
    console.log('- 用户邮箱:', userEmail);
    console.log('- 需要积分:', PROCESSING_CREDITS_COST);

    // 检查用户积分是否足够
    const { data: creditData, error: creditError } = await supabase
      .from('gemini_flash_user_credits')
      .select('balance')
      .eq('user_id', userId)
      .single();

    console.log('- 积分查询结果:', creditData);
    console.log('- 积分查询错误:', creditError);

    if (creditError) {
      console.error('检查用户积分失败:', creditError);
      return NextResponse.json(
        { error: '检查用户积分失败' },
        { status: 500 }
      );
    }

    const currentCredits = creditData?.balance || 0;
    console.log('- 当前积分余额:', currentCredits);
    
    if (currentCredits < PROCESSING_CREDITS_COST) {
      console.log('❌ 积分不足，无法扣除');
      return NextResponse.json(
        { 
          error: '积分不足', 
          currentCredits,
          requiredCredits: PROCESSING_CREDITS_COST,
          message: `当前积分: ${currentCredits}, 需要积分: ${PROCESSING_CREDITS_COST}`
        },
        { status: 402 }
      );
    }

    // 扣除积分
    const newBalance = currentCredits - PROCESSING_CREDITS_COST;
    
    const { error: updateError } = await supabase
      .from('gemini_flash_user_credits')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('扣除用户积分失败:', updateError);
      return NextResponse.json(
        { error: '扣除积分失败' },
        { status: 500 }
      );
    }

    console.log('✅ 积分扣除成功，新余额:', newBalance);

    // 生成唯一的交易ID
    const transactionId = `img_${Date.now()}_${userId}`;
    
    // 记录积分交易
    console.log('📝 开始记录积分交易...');
    console.log('- 交易数据:', {
      user_id: userId,
      amount: -PROCESSING_CREDITS_COST,
      type: 'CONSUME',
      description: '图片编辑消费积分',
      reference_id: transactionId,
      metadata: { processing_type: 'image_editing', status: 'pending' }
    });

    // 先测试数据库连接
    console.log('🔍 测试数据库连接...');
    const { data: testData, error: testError } = await supabase
      .from('gemini_flash_credit_transactions')
      .select('id')
      .limit(1);

    if (testError) {
      console.error('❌ 数据库连接测试失败:', testError);
    } else {
      console.log('✅ 数据库连接测试成功，表中有', testData?.length || 0, '条记录');
    }

    const { data: transactionData, error: transactionError } = await supabase
      .from('gemini_flash_credit_transactions')
      .insert({
        user_id: userId,
        amount: -PROCESSING_CREDITS_COST, // 负数表示消费
        type: 'CONSUME',
        description: '图片编辑消费积分',
        reference_id: transactionId,
        metadata: { processing_type: 'image_editing', status: 'pending', created_at: new Date().toISOString() }
      })
      .select();

    if (transactionError) {
      console.error('❌ 记录积分交易失败:', transactionError);
      console.error('- 错误详情:', transactionError);
      console.error('- 错误代码:', transactionError.code);
      console.error('- 错误消息:', transactionError.message);
      console.error('- 错误详情:', transactionError.details);
      console.error('- 错误提示:', transactionError.hint);
      // 即使记录失败，积分已经扣除，所以这里不返回false
    } else {
      console.log('✅ 积分交易记录成功:', transactionData);
    }

    console.log(`💸 用户 ${userId} 预扣 ${PROCESSING_CREDITS_COST} 积分进行图片处理`);

    return NextResponse.json({
      success: true,
      message: '积分预扣成功',
      consumedCredits: PROCESSING_CREDITS_COST,
      newBalance: newBalance,
      transactionId: transactionId
    });

  } catch (error) {
    console.error('❌ 积分消费失败:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : '积分消费时发生未知错误' 
      },
      { status: 500 }
    );
  }
}
