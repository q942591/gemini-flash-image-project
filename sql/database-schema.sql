-- 支付意图表
CREATE TABLE stripe_payment_intents (
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

-- 用户积分表（如果还没有的话）
CREATE TABLE user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  balance INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 积分交易记录表（如果还没有的话）
CREATE TABLE credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  reference_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_stripe_payment_intents_user_id ON stripe_payment_intents(user_id);
CREATE INDEX idx_stripe_payment_intents_status ON stripe_payment_intents(status);
CREATE INDEX idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);

-- 创建或替换积分添加函数
CREATE OR REPLACE FUNCTION add_user_credits(
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
  INSERT INTO credit_transactions (user_id, amount, type, description, reference_id, metadata)
  VALUES (p_user_id, p_amount, p_type, p_description, p_reference_id, p_metadata)
  RETURNING id INTO v_transaction_id;

  -- 更新或插入用户积分余额
  INSERT INTO user_credits (user_id, balance)
  VALUES (p_user_id, p_amount)
  ON CONFLICT (user_id)
  DO UPDATE SET 
    balance = user_credits.balance + p_amount,
    updated_at = NOW()
  RETURNING balance INTO v_new_balance;

  RETURN jsonb_build_object(
    'transaction_id', v_transaction_id,
    'new_balance', v_new_balance,
    'amount_added', p_amount
  );
END;
$$ LANGUAGE plpgsql;
