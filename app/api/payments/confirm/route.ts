import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-server';
import { confirmPayment } from '@/lib/stripe';

// 强制动态路由，防止静态生成
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, userId } = await request.json();
    
    // 验证用户身份 - 从前端传递的userId验证
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // 确认支付状态
    const paymentIntent = await confirmPayment(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }

    // 从元数据获取套餐信息
    const { planId, planName, credits } = paymentIntent.metadata;
    const creditsAmount = parseInt(credits || '0');

    if (!planId || !creditsAmount) {
      return NextResponse.json({ error: 'Invalid payment metadata' }, { status: 400 });
    }

    // 添加积分到用户账户 - 使用直接的数据库操作
    try {
      // 检查用户是否已有积分记录
      const { data: existingCredit } = await supabaseAdmin
        .from('gemini_flash_user_credits')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (existingCredit) {
        // 更新现有积分记录
        const { error: updateError } = await supabaseAdmin
          .from('gemini_flash_user_credits')
          .update({ 
            balance: existingCredit.balance + creditsAmount,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)

        if (updateError) {
          console.error('更新积分失败:', updateError)
          return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 })
        }
      } else {
        // 创建新的积分记录
        const { error: insertError } = await supabaseAdmin
          .from('gemini_flash_user_credits')
          .insert({
            user_id: userId,
            balance: creditsAmount,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (insertError) {
          console.error('创建积分记录失败:', insertError)
          return NextResponse.json({ error: 'Failed to create credits' }, { status: 500 })
        }
      }

      // 创建积分交易记录
      const { error: transactionError } = await supabaseAdmin
        .from('gemini_flash_credit_transactions')
        .insert({
          user_id: userId,
          amount: creditsAmount,
          type: 'PURCHASE',
          description: `充值积分: ${planName}`,
          reference_id: paymentIntentId,
          metadata: { 
            paymentIntentId, 
            planId, 
            planName,
            stripePaymentIntentId: paymentIntentId,
          },
          created_at: new Date().toISOString()
        })

      if (transactionError) {
        console.error('创建交易记录失败:', transactionError)
        return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 })
      }

      console.log('积分添加成功:', { userId, creditsAmount, planName })

    } catch (error) {
      console.error('积分操作失败:', error)
      return NextResponse.json({ error: 'Failed to process credits' }, { status: 500 })
    }

    // 更新支付意图状态 - 使用服务端supabaseAdmin
    await supabaseAdmin
      .from('gemini_flash_stripe_payment_intents')
      .update({ 
        status: 'succeeded',
        confirmed_at: new Date().toISOString(),
      })
      .eq('id', paymentIntentId);

    // 记录购买历史 - 使用服务端supabaseAdmin
    await supabaseAdmin
      .from('gemini_flash_purchase_history')
      .insert({
        user_id: userId,
        plan_id: planId,
        plan_name: planName,
        credits_purchased: creditsAmount,
        amount_paid: paymentIntent.amount,
        currency: paymentIntent.currency,
        stripe_payment_intent_id: paymentIntentId,
        status: 'completed',
      });

    return NextResponse.json({
      success: true,
      credits: creditsAmount,
      planName,
      message: '积分添加成功'
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
