import Stripe from 'stripe';

// 初始化Stripe客户端
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2025-08-27.basil',
});

// 创建支付意图
export const createPaymentIntent = async ({
  amount,
  currency = 'usd',
  metadata = {},
}: {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe使用分为单位
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  } catch (error) {
    console.error('创建支付意图失败:', error);
    throw error;
  }
};

// 确认支付
export const confirmPayment = async (paymentIntentId: string, paymentMethodId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });
    return paymentIntent;
  } catch (error) {
    console.error('确认支付失败:', error);
    throw error;
  }
};

// 验证webhook签名
export const verifyWebhookSignature = (payload: string, signature: string, secret: string) => {
  try {
    return stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.error('验证webhook签名失败:', error);
    throw error;
  }
};
