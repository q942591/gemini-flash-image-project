import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 创建Supabase客户端（服务端）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 图片处理消耗的积分数量
const PROCESSING_CREDITS_COST = 15;

export async function POST(request: NextRequest) {
  try {
    const { transactionId, reason } = await request.json();

    if (!transactionId) {
      return NextResponse.json(
        { error: '缺少交易ID' },
        { status: 400 }
      );
    }

    // 获取用户认证信息
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '缺少用户认证信息' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // 验证用户token并获取用户信息
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json(
        { error: '用户认证失败' },
        { status: 401 }
      );
    }

    const userId = user.id;
    const userEmail = user.email || '';

    // 查找原始交易记录
    const { data: originalTransaction, error: findError } = await supabase
      .from('gemini_flash_credit_transactions')
      .select('*')
      .eq('reference_id', transactionId)
      .eq('type', 'CONSUME')
      .single();

    if (findError) {
      console.error('查找原始交易记录失败:', findError);
      return NextResponse.json(
        { error: '查找原始交易记录失败' },
        { status: 500 }
      );
    }

    // 检查是否已经返还过（注意：原始交易可能没有status字段）
    if (originalTransaction.metadata?.status === 'refunded') {
      return NextResponse.json(
        { error: '该交易已经返还过积分' },
        { status: 400 }
      );
    }

    // 返还积分
    const { data: creditData, error: creditError } = await supabase
      .from('gemini_flash_user_credits')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (creditError) {
      console.error('获取用户积分失败:', creditError);
      return NextResponse.json(
        { error: '获取用户积分失败' },
        { status: 500 }
      );
    }

    const currentCredits = creditData?.balance || 0;
    const newBalance = currentCredits + PROCESSING_CREDITS_COST;
    
    const { error: updateError } = await supabase
      .from('gemini_flash_user_credits')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('返还用户积分失败:', updateError);
      return NextResponse.json(
        { error: '返还积分失败' },
        { status: 500 }
      );
    }

    // 记录返还交易
    const { error: refundTransactionError } = await supabase
      .from('gemini_flash_credit_transactions')
      .insert({
        user_id: userId,
        amount: PROCESSING_CREDITS_COST, // 正数表示返还
        type: 'REFUND',
        description: `积分返还: ${reason}`,
        reference_id: `refund_${transactionId}`,
        metadata: { 
          original_transaction_id: originalTransaction.id,
          refund_reason: reason,
          status: 'completed'
        }
      });

    if (refundTransactionError) {
      console.error('记录返还交易失败:', refundTransactionError);
    }

    // 更新原始交易状态
    const { error: updateOriginalError } = await supabase
      .from('gemini_flash_credit_transactions')
      .update({ 
        metadata: { 
          ...originalTransaction.metadata,
          refunded_at: new Date().toISOString(),
          refund_reason: reason,
          status: 'refunded'
        }
      })
      .eq('id', originalTransaction.id);

    if (updateOriginalError) {
      console.error('更新原始交易状态失败:', updateOriginalError);
    }

    console.log(`💰 用户 ${userId} 返还 ${PROCESSING_CREDITS_COST} 积分，原因: ${reason || '图片处理失败'}`);

    return NextResponse.json({
      success: true,
      message: '积分返还成功',
      refundedCredits: PROCESSING_CREDITS_COST,
      newBalance: newBalance,
      reason: reason || '图片处理失败'
    });

  } catch (error) {
    console.error('积分返还失败:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : '积分返还时发生未知错误' 
      },
      { status: 500 }
    );
  }
}
