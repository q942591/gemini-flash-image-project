-- Gemini Flash Image Project 数据库表结构
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

-- 4. 图片处理记录表（用于记录积分消耗）
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

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_gemini_flash_payment_intents_user_id 
ON gemini_flash_stripe_payment_intents(user_id);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_payment_intents_status 
ON gemini_flash_stripe_payment_intents(status);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_payment_intents_plan_id 
ON gemini_flash_stripe_payment_intents(plan_id);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_user_credits_user_id 
ON gemini_flash_user_credits(user_id);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_credit_transactions_user_id 
ON gemini_flash_credit_transactions(user_id);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_credit_transactions_type 
ON gemini_flash_credit_transactions(type);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_image_processing_logs_user_id 
ON gemini_flash_image_processing_logs(user_id);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_image_processing_logs_created_at 
ON gemini_flash_image_processing_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_purchase_history_user_id 
ON gemini_flash_purchase_history(user_id);

CREATE INDEX IF NOT EXISTS idx_gemini_flash_purchase_history_created_at 
ON gemini_flash_purchase_history(created_at);

-- 创建或替换积分添加函数
CREATE OR REPLACE FUNCTION gemini_flash_add_user_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_type TEXT,
  p_description TEXT DEFAULT NULL,
  p_reference_id TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  v_transaction_id UUID;
  v_new_balance INTEGER;
BEGIN
  -- 插入交易记录
  INSERT INTO gemini_flash_credit_transactions (user_id, amount, type, description, reference_id, metadata)
  VALUES (p_user_id, p_amount, p_type, p_description, p_reference_id, p_metadata)
  RETURNING id INTO v_transaction_id;

  -- 更新或插入用户积分余额
  INSERT INTO gemini_flash_user_credits (user_id, balance)
  VALUES (p_user_id, p_amount)
  ON CONFLICT (user_id)
  DO UPDATE SET 
    balance = gemini_flash_user_credits.balance + p_amount,
    updated_at = NOW()
  RETURNING balance INTO v_new_balance;

  RETURN jsonb_build_object(
    'transaction_id', v_transaction_id,
    'new_balance', v_new_balance,
    'amount_added', p_amount
  );
END;
$$ LANGUAGE plpgsql;

-- 创建或替换积分消费函数
CREATE OR REPLACE FUNCTION gemini_flash_consume_user_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_type TEXT,
  p_description TEXT DEFAULT NULL,
  p_reference_id TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  v_transaction_id UUID;
  v_new_balance INTEGER;
  v_current_balance INTEGER;
BEGIN
  -- 检查用户积分余额
  SELECT balance INTO v_current_balance 
  FROM gemini_flash_user_credits 
  WHERE user_id = p_user_id;
  
  IF v_current_balance IS NULL THEN
    RAISE EXCEPTION 'User has no credits';
  END IF;
  
  IF v_current_balance < p_amount THEN
    RAISE EXCEPTION 'Insufficient credits. Required: %, Available: %', p_amount, v_current_balance;
  END IF;

  -- 插入消费交易记录（负数表示消费）
  INSERT INTO gemini_flash_credit_transactions (user_id, amount, type, description, reference_id, metadata)
  VALUES (p_user_id, -p_amount, p_type, p_description, p_reference_id, p_metadata)
  RETURNING id INTO v_transaction_id;

  -- 更新用户积分余额
  UPDATE gemini_flash_user_credits 
  SET 
    balance = balance - p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id
  RETURNING balance INTO v_new_balance;

  RETURN jsonb_build_object(
    'transaction_id', v_transaction_id,
    'new_balance', v_new_balance,
    'amount_consumed', p_amount,
    'previous_balance', v_current_balance
  );
END;
$$ LANGUAGE plpgsql;

-- 创建或替换获取用户积分余额函数
CREATE OR REPLACE FUNCTION gemini_flash_get_user_credits(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_balance INTEGER;
BEGIN
  SELECT COALESCE(balance, 0) INTO v_balance
  FROM gemini_flash_user_credits
  WHERE user_id = p_user_id;
  
  RETURN v_balance;
END;
$$ LANGUAGE plpgsql;

-- 创建或替换获取用户积分交易历史函数
CREATE OR REPLACE FUNCTION gemini_flash_get_user_transactions(
  p_user_id UUID,
  p_limit INTEGER DEFAULT 50,
  p_offset INTEGER DEFAULT 0
) RETURNS TABLE(
  id UUID,
  amount INTEGER,
  type TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ct.id,
    ct.amount,
    ct.type,
    ct.description,
    ct.created_at
  FROM gemini_flash_credit_transactions ct
  WHERE ct.user_id = p_user_id
  ORDER BY ct.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- 创建行级安全策略（RLS）
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

-- 创建触发器函数，自动更新updated_at字段
CREATE OR REPLACE FUNCTION gemini_flash_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为需要自动更新updated_at的表创建触发器
CREATE TRIGGER update_gemini_flash_user_credits_updated_at
  BEFORE UPDATE ON gemini_flash_user_credits
  FOR EACH ROW
  EXECUTE FUNCTION gemini_flash_update_updated_at_column();

-- 插入一些测试数据（可选）
-- INSERT INTO gemini_flash_user_credits (user_id, balance) VALUES 
-- ('your-test-user-id', 1000);

-- 显示创建成功的消息
DO $$
BEGIN
  RAISE NOTICE 'Gemini Flash Image Project 数据库表创建完成！';
  RAISE NOTICE '已创建以下表:';
  RAISE NOTICE '- gemini_flash_stripe_payment_intents (支付意图表)';
  RAISE NOTICE '- gemini_flash_user_credits (用户积分表)';
  RAISE NOTICE '- gemini_flash_credit_transactions (积分交易记录表)';
  RAISE NOTICE '- gemini_flash_image_processing_logs (图片处理记录表)';
  RAISE NOTICE '- gemini_flash_purchase_history (购买历史表)';
  RAISE NOTICE '';
  RAISE NOTICE '已创建以下函数:';
  RAISE NOTICE '- gemini_flash_add_user_credits (添加积分)';
  RAISE NOTICE '- gemini_flash_consume_user_credits (消费积分)';
  RAISE NOTICE '- gemini_flash_get_user_credits (获取积分余额)';
  RAISE NOTICE '- gemini_flash_get_user_transactions (获取交易历史)';
  RAISE NOTICE '';
  RAISE NOTICE '已启用行级安全策略(RLS)';
  RAISE NOTICE '所有表都已创建索引以提高查询性能';
END $$;
