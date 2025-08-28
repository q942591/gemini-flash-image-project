// 支付套餐类型定义
export interface CreditPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  popular?: boolean;
  stripe_price_id: string;
  estimatedEdits: number;
}

// 支付状态
export interface PaymentStatus {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// 支付表单数据
export interface PaymentFormData {
  planId: string;
  planName: string;
  amount: number;
  credits: number;
}
