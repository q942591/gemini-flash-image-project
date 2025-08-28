import { CreditPlan } from '@/types/payment';

// 支付套餐配置
export const CREDIT_PLANS: CreditPlan[] = [
  {
    id: 'basic',
    name: '基础版',
    credits: 160,
    price: 1.99,
    description: '标准分辨率输出，基础模板使用，邮件支持',
    stripe_price_id: 'price_basic_160_credits', // 需要替换为实际的Stripe价格ID
    estimatedEdits: 10,
  },
  {
    id: 'standard',
    name: '标准版',
    credits: 550,
    price: 5.99,
    description: '高清分辨率输出，所有基础模板，优先客服支持',
    stripe_price_id: 'price_standard_550_credits', // 需要替换为实际的Stripe价格ID
    estimatedEdits: 36,
  },
  {
    id: 'professional',
    name: '专业版',
    credits: 2700,
    price: 19.99,
    description: '4K超高清输出，所有高级模板，批量处理功能，专属客服支持',
    popular: true,
    stripe_price_id: 'price_professional_2700_credits', // 需要替换为实际的Stripe价格ID
    estimatedEdits: 180,
  },
  {
    id: 'enterprise',
    name: '企业版',
    credits: 9000,
    price: 49.9,
    description: '8K超高清输出，团队协作功能，API接口访问，专属客户经理',
    stripe_price_id: 'price_enterprise_9000_credits', // 需要替换为实际的Stripe价格ID
    estimatedEdits: 600,
  },
];

// 根据ID获取套餐
export function getPlanById(id: string): CreditPlan | undefined {
  return CREDIT_PLANS.find(plan => plan.id === id);
}

// 根据积分数量获取套餐
export function getPlanByCredits(credits: number): CreditPlan | undefined {
  return CREDIT_PLANS.find(plan => plan.credits === credits);
}
