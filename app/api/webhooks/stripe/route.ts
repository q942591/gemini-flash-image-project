import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { verifyWebhookSignature } from '@/lib/stripe';

// 强制动态路由，防止静态生成
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;
    
    // 验证webhook签名
    const event = verifyWebhookSignature(body, signature, webhookSecret);
    
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as any;
        
        // 更新支付意图状态 - 使用服务端supabaseAdmin
        await supabaseAdmin
          .from('gemini_flash_stripe_payment_intents')
          .update({ 
            status: 'succeeded',
            webhook_processed_at: new Date().toISOString(),
          })
          .eq('id', paymentIntent.id);
        
        console.log(`Payment succeeded: ${paymentIntent.id}`);
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as any;
        
        // 更新支付意图状态 - 使用服务端supabaseAdmin
        await supabaseAdmin
          .from('gemini_flash_stripe_payment_intents')
          .update({ 
            status: 'failed',
            webhook_processed_at: new Date().toISOString(),
          })
          .eq('id', paymentIntent.id);
        
        console.log(`Payment failed: ${paymentIntent.id}`);
        break;
      }
      
      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object as any;
        
        // 更新支付意图状态 - 使用服务端supabaseAdmin
        await supabaseAdmin
          .from('gemini_flash_stripe_payment_intents')
          .update({ 
            status: 'canceled',
            webhook_processed_at: new Date().toISOString(),
          })
          .eq('id', paymentIntent.id);
        
        console.log(`Payment canceled: ${paymentIntent.id}`);
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler failed:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}
