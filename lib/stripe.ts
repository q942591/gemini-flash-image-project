import Stripe from 'stripe';

// 初始化Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2024-12-18.acacia',
});

// 创建支付意图
export async function createPaymentIntent({
  amount,
  currency = 'usd',
  metadata = {},
}: {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Stripe使用分为单位
    currency,
    metadata,
    automatic_payment_methods: { enabled: true },
  });
  return paymentIntent;
}

// 确认支付
export async function confirmPayment(paymentIntentId: string) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return paymentIntent;
}

// 验证webhook签名
export function verifyWebhookSignature(
  body: string,
  signature: string,
  webhookSecret: string
) {
  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    throw new Error(`Webhook signature verification failed: ${error}`);
  }
}
