-- Gemini Flash Image Project - Supabase 数据库表结构
-- 请在Supabase SQL编辑器中执行此脚本

-- 1. 支付意图表
CREATE TABLE IF NOT EXISTS gemini_flash_stripe_payment_intents (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'requires_payment_method',
  metadata JSONB,
  plan_id TEXT,
  credits INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  webhook_processed_at TIMESTAMP WITH TIME ZONE
);

-- 2. 用户积分表
CREATE TABLE IF NOT EXISTS gemini_flash_user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  balance INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 积分交易记录表
CREATE TABLE IF NOT EXISTS gemini_flash_credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  reference_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 图片处理记录表
CREATE TABLE IF NOT EXISTS gemini_flash_image_processing_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_name TEXT,
  processing_type TEXT NOT NULL,
  credits_consumed INTEGER NOT NULL DEFAULT 15,
  original_size INTEGER,
  processed_size INTEGER,
  processing_time_ms INTEGER,
  status TEXT NOT NULL DEFAULT 'completed',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 用户套餐购买记录表
CREATE TABLE IF NOT EXISTS gemini_flash_purchase_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  credits_purchased INTEGER NOT NULL,
  amount_paid INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_gemini_flash_payment_intents_user_id 
ON gemini_flash_stripe_payment_intents(user_id);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_payment_intents_status 
ON gemini_flash_stripe_payment_intents(status);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_user_credits_user_id 
ON gemini_flash_user_credits(user_id);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_credit_transactions_user_id 
ON gemini_flash_credit_transactions(user_id);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_image_processing_logs_user_id 
ON gemini_flash_image_processing_logs(user_id);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_purchase_history_user_id 
ON gemini_flash_purchase_history(user_id);

-- 启用行级安全策略（RLS）
ALTER TABLE gemini_flash_stripe_payment_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemini_flash_user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemini_flash_credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemini_flash_image_processing_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemini_flash_purchase_history ENABLE ROW LEVEL SECURITY;

-- 支付意图表策略
CREATE POLICY "Users can view their own payment intents" ON gemini_flash_stripe_payment_intents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment intents" ON gemini_flash_stripe_payment_intents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment intents" ON gemini_flash_stripe_payment_intents
  FOR UPDATE USING (auth.uid() = user_id);

-- 用户积分表策略
CREATE POLICY "Users can view their own credits" ON gemini_flash_user_credits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credits" ON gemini_flash_user_credits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits" ON gemini_flash_user_credits
  FOR UPDATE USING (auth.uid() = user_id);

-- 积分交易记录表策略
CREATE POLICY "Users can view their own transactions" ON gemini_flash_credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" ON gemini_flash_credit_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 图片处理记录表策略
CREATE POLICY "Users can view their own processing logs" ON gemini_flash_image_processing_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own processing logs" ON gemini_flash_image_processing_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 购买历史表策略
CREATE POLICY "Users can view their own purchase history" ON gemini_flash_purchase_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchase history" ON gemini_flash_purchase_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 显示创建成功的消息
DO $$
BEGIN
  RAISE NOTICE 'Gemini Flash Image Project 数据库表创建完成！';
  RAISE NOTICE '';
  RAISE NOTICE '已创建以下表:';
  RAISE NOTICE '- gemini_flash_stripe_payment_intents (支付意图表)';
  RAISE NOTICE '- gemini_flash_user_credits (用户积分表)';
  RAISE NOTICE '- gemini_flash_credit_transactions (积分交易记录表)';
  RAISE NOTICE '- gemini_flash_image_processing_logs (图片处理记录表)';
  RAISE NOTICE '- gemini_flash_purchase_history (购买历史表)';
  RAISE NOTICE '';
  RAISE NOTICE '已启用行级安全策略(RLS)';
  RAISE NOTICE '所有表都已创建索引以提高查询性能';
  RAISE NOTICE '';
  RAISE NOTICE '下一步：在Supabase Dashboard中设置存储策略和API密钥';
END $$;
