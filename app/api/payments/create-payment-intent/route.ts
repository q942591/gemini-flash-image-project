import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-server';
import { createPaymentIntent } from '@/lib/stripe';
import { getPlanById } from '@/config/credit-plans';

// 强制动态路由，防止静态生成
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const { planId, userId } = await request.json();
    
    // 验证用户身份 - 从前端传递的userId验证
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // 获取套餐信息
    const plan = getPlanById(planId);
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // 创建支付意图
    const paymentIntent = await createPaymentIntent({
      amount: plan.price,
      currency: 'usd',
      metadata: {
        userId: userId,
        planId: plan.id,
        planName: plan.name,
        credits: plan.credits.toString(),
        type: 'credit_purchase',
      },
    });

    // 保存到数据库 - 使用服务端supabaseAdmin绕过RLS
    const { error: dbError } = await supabaseAdmin.from('gemini_flash_stripe_payment_intents').insert({
      id: paymentIntent.id,
      user_id: userId,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      metadata: paymentIntent.metadata,
      plan_id: plan.id,
      credits: plan.credits,
    });

    if (dbError) {
      console.error('Database error:', dbError);
      // 即使数据库保存失败，也返回支付意图，因为支付可能成功
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      plan: {
        id: plan.id,
        name: plan.name,
        credits: plan.credits,
        price: plan.price,
      }
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
